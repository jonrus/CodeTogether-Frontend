import {useEffect, useRef} from "react";
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {ViewPlugin, ViewUpdate} from "@codemirror/view";
import {StateField} from "@codemirror/state";
import {Tooltip, showTooltip} from "@codemirror/tooltip";
import {collab, receiveUpdates, sendableUpdates, getSyncedVersion} from "@codemirror/collab";
import {javascript} from "@codemirror/lang-javascript"

interface IEditor {
    user: string,
    version: number,
    doc: string,
    docReady: boolean,
    fnPullUpdates: Function,
    fnPushUpdates: Function,
    fnHasCursorUpdate: Function,
    fnPullCursors: Function
}

export default function Editor({
    user, version, doc, docReady, fnPullUpdates,
    fnPushUpdates, fnPullCursors, fnHasCursorUpdate
    }: IEditor) {

    const editorDOM = useRef<HTMLDivElement>(null);
    /*
        A custom function/class/plugin to enable collab features
        mostly pulled from the docs, with a few tweaks
        https://codemirror.net/6/examples/collab/
    */
    
        function getCursorTooltips(state: EditorState): readonly Tooltip[] {
            return fnPullCursors()
                    .filter((mem: {name: string}) => mem.name !== user)
                    .map((mem: {name: string, selection: {head: number}, color: string}) => {
                        const text = mem.name;
                        return {
                            pos: mem.selection.head,
                            above: true,
                            strictSide: false,
                            class: "cm-cursor-tooltip",
                            create: () => {
                                const dom = document.createElement("div");
                                dom.textContent = text;
                                dom.style.backgroundColor = mem.color;
                                return {dom};
                            }
                        };
                });
        };

        const cursorTooltipField = StateField.define<readonly Tooltip[]>({
            create: getCursorTooltips,

            update(tooltips, tr) {
                if (!fnHasCursorUpdate) return tooltips;
                return getCursorTooltips(tr.state);
            },

            provide: f => showTooltip.computeN([f], state => state.field(f))
        });

        const cursorTooltipBaseTheme = EditorView.baseTheme({
            ".cm-tooltip.cm-cursor-tooltip": {
              color: "white",
              transform: "translate(-50%, -7px)",
              border: "none",
              padding: "2px 2px",
              borderRadius: "10px",
              opacity: "0.4",
              "&:before": {
                position: "absolute",
                content: '""',
                left: "50%",
                marginLeft: "-5px",
                bottom: "-5px",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid black"
              }
            }
        });

    function peerExtension(startVersion: number = 0) {
            let plugin = ViewPlugin.fromClass(class {
            private pushing = false;
            private selection = {from: 0, to: 0};
            private pullInterval = setInterval(() => {
                this.pull();
            }, 100);
            private pushInterval = setInterval(() => {
                this.push();
            }, 100);

            constructor(private view: EditorView) {
                this.pull();
            }

            update(update: ViewUpdate) {
                if (update.selectionSet) {
                    this.selection = update.state.selection.ranges[0];
                }
                if (update.docChanged) {
                    this.push();
                }
            }

            push() {
                let updates = sendableUpdates(this.view.state);
                if (this.pushing || !updates.length) return;
                this.pushing = true;
                let version = getSyncedVersion(this.view.state);
                fnPushUpdates(version, updates, this.selection);
                this.pushing = false;
            }

            pull() {
                const version = getSyncedVersion(this.view.state);
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
    return [collab({startVersion: version, clientID: user}), plugin];
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
                peerExtension(version),
                cursorTooltipField,
                cursorTooltipBaseTheme
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