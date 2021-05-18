import {useEffect, useRef} from "react";
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {ViewPlugin, ViewUpdate} from "@codemirror/view";
import {collab, Update, receiveUpdates, sendableUpdates, getSyncedVersion} from "@codemirror/collab";
import {javascript} from "@codemirror/lang-javascript"

interface IEditor {
    user: string,
    version: number,
    doc: string,
    changes: Update[],
    fnSendData: Function,
    fnPullUpdates: Function,
    fnPushUpdates: Function
}

export default function Editor({user, version, doc, changes, fnSendData, fnPullUpdates, fnPushUpdates}: IEditor) {
    const editorDOM = useRef<HTMLDivElement>(null);
    // const intervalID = useRef<NodeJS.Timeout | null>(null);

    function peerExtension(startVersion: number = 0) {
        let plugin = ViewPlugin.fromClass(class {
        private pushing = false;
        private done = false;
        private pullInterval = setInterval(() => {
            this.pull();
        }, 200);
        private pushInterval = setInterval(() => {
            this.push();
        }, 300);

        constructor(private view: EditorView) { this.pull() }

        update(update: ViewUpdate) {
            if (update.docChanged) this.push()
        }

        push() {
            let updates = sendableUpdates(this.view.state)
            if (this.pushing || !updates.length) return
            this.pushing = true
            let version = getSyncedVersion(this.view.state)
            fnPushUpdates(version, updates)
            this.pushing = false
        }

        pull() {
            let version = getSyncedVersion(this.view.state)
            let updates = fnPullUpdates(version)
            if (updates.length) {
                this.view.dispatch(receiveUpdates(this.view.state, updates))
            }
        }

        destroy() {
            clearInterval(this.pullInterval);
            clearInterval(this.pushInterval);
            this.done = true
        }
        })
    return [collab({startVersion}), plugin]
}

    useEffect(() => {
        if (!editorDOM.current) throw Error("editorDOM is unassigned");
        // if (version === -1) return; //Wait until doc sent from server

        //Build Editor State
        const editorState = EditorState.create({
            doc: doc,
            extensions: [
                basicSetup,
                javascript(),
                peerExtension(version)
                // collab({clientID: user}),
            ]
        });
        
        //Build the editor and attach to DOM element
        const editorView = new EditorView({
            state: editorState,
            parent: editorDOM.current
        });

        //Done with setup
        editorView.focus();
        //Clean up
        return () => {
            editorView.destroy();
        }
    }, [version]);


    return (
        <div className="Editor" ref={editorDOM}>
        </div>
    );
}