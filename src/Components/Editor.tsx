import {useEffect, useRef} from "react";
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {ViewPlugin, ViewUpdate} from "@codemirror/view";
import {collab, receiveUpdates, sendableUpdates, getSyncedVersion} from "@codemirror/collab";
import {javascript} from "@codemirror/lang-javascript"

interface IEditor {
    user: string,
    version: number,
    doc: string,
    docReady: boolean,
    fnPullUpdates: Function,
    fnPushUpdates: Function
}

export default function Editor({
    user, version, doc, docReady, fnPullUpdates, fnPushUpdates}: IEditor) {

    const editorDOM = useRef<HTMLDivElement>(null);

    /*
        A custom function/class/plugin to enable collab features
        mostly pulled from the docs, with a few tweaks
        https://codemirror.net/6/examples/collab/
    */
    function peerExtension(startVersion: number = 0) {
            let plugin = ViewPlugin.fromClass(class {
            private pushing = false;
            private pullInterval = setInterval(() => {
                this.pull();
            }, 100);
            private pushInterval = setInterval(() => {
                this.push();
            }, 150);

            constructor(private view: EditorView) {
                this.pull();
            }

            update(update: ViewUpdate) {
                if (update.docChanged) {
                    this.push();
                }
            }

            push() {
                let updates = sendableUpdates(this.view.state);
                if (this.pushing || !updates.length) return;
                this.pushing = true;
                console.log("4");
                let version = getSyncedVersion(this.view.state);
                console.log("5");
                console.log(updates);
                fnPushUpdates(version, updates);
                console.log("6");
                this.pushing = false;
            }

            pull() {
                let version = getSyncedVersion(this.view.state);
                let updates = fnPullUpdates(version);
                if (updates.length) {
                    this.view.dispatch(receiveUpdates(this.view.state, updates));
                }
            }

            destroy() {
                clearInterval(this.pullInterval);
                clearInterval(this.pushInterval);
            }
    })
    return [collab({startVersion, clientID: user}), plugin]
}

    useEffect(() => {
        if (!editorDOM.current) throw Error("editorDOM is unassigned");
        if (!docReady) return;

        //Build Editor State
        const editorState = EditorState.create({
            doc: doc,
            extensions: [
                basicSetup,
                javascript(),
                peerExtension(version)
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
            //Important to clear the intervals of peerExtension
            editorView.destroy();
        }
    }, [docReady]);

    //Finally return the div
    return (
        <div className="Editor" ref={editorDOM}>
        </div>
    );
}