import {useEffect, useRef} from "react";
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {ViewPlugin, ViewUpdate} from "@codemirror/view";
import {StateField, Compartment} from "@codemirror/state";
import {Tooltip, showTooltip} from "@codemirror/tooltip";
import {collab, receiveUpdates, sendableUpdates, getSyncedVersion, Update} from "@codemirror/collab";

//Codemirror language servers
import {cpp} from "@codemirror/lang-cpp";
import {css} from "@codemirror/lang-css";
import {html} from "@codemirror/lang-html";
import {java} from "@codemirror/lang-java";
import {javascript} from "@codemirror/lang-javascript";
import {json} from "@codemirror/lang-json";
import {markdown} from "@codemirror/lang-markdown";
import {python} from "@codemirror/lang-python";
import {rust} from "@codemirror/lang-rust";
import {sql} from "@codemirror/lang-sql";

//Child Comp
import EditorOptions from "./EditorOptions";

interface IEditor {
    user: string,
    version: number,
    doc: string,
    docReady: boolean,
    fnNotifyEditor: Function,
    fnPushUpdates: Function,
    fnHasCursorUpdate: Function,
    fnPullCursors: Function
}

export default function Editor({
    user, version, doc, docReady, fnNotifyEditor,
    fnPushUpdates, fnPullCursors, fnHasCursorUpdate
    }: IEditor) {

    const editorDOM = useRef<HTMLDivElement>(null);
    const editorChangeSyntax = useRef<Function>(() => {});
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
            private selection = {from: 0, to: 0, head: 0};

            constructor(private view: EditorView) {
                //Notifiy Layout we're ready to catch updates
                fnNotifyEditor(this.catchUpdates.bind(this));
            }

            update(update: ViewUpdate) {
                if (update.selectionSet) {
                    this.selection = update.state.selection.ranges[0];
                }
                if (update.docChanged) {
                    this.pushUpdates();
                }
            }

            pushUpdates() {
                const updates = sendableUpdates(this.view.state);
                if (!updates.length) return;
                    const version = getSyncedVersion(this.view.state);
                    fnPushUpdates(version, updates, this.selection);
                }

            catchUpdates(fullUpdates: Update[]) {
                const version = getSyncedVersion(this.view.state);
                const updates = fullUpdates.splice(version - startVersion);
                if (updates.length) {
                            this.view.dispatch(receiveUpdates(this.view.state, updates));
                }
            }

            destroy() {}
        });
        return [collab({startVersion: version, clientID: user}), plugin];
    }

    useEffect(() => {
        if (!editorDOM.current) throw Error("editorDOM is unassigned");
        if (!docReady) return;

        //Syntax highlighing Compartment
        const languageConf = new Compartment;
        const setSyntaxLang = (lang: string) => {
            switch (lang) {
                case "cpp":
                   editorView.dispatch({effects: languageConf.reconfigure(cpp())});
                   break;
                case "css":
                   editorView.dispatch({effects: languageConf.reconfigure(css())});
                   break;
                case "html":
                   editorView.dispatch({effects: languageConf.reconfigure(html())});
                   break;
                case "java":
                   editorView.dispatch({effects: languageConf.reconfigure(java())});
                   break;
                case "javascript":
                   editorView.dispatch({effects: languageConf.reconfigure(javascript())});
                   break;
                case "json":
                   editorView.dispatch({effects: languageConf.reconfigure(json())});
                   break;
                case "markdown":
                   editorView.dispatch({effects: languageConf.reconfigure(markdown())});
                   break;
                case "python":
                   editorView.dispatch({effects: languageConf.reconfigure(python())});
                   break;
                case "rust":
                   editorView.dispatch({effects: languageConf.reconfigure(rust())});
                   break;
                case "sql":
                   editorView.dispatch({effects: languageConf.reconfigure(sql())});
                   break;
                default:
                   editorView.dispatch({effects: languageConf.reconfigure(javascript())});
            }
        };
        //Set link to function
        editorChangeSyntax.current = setSyntaxLang; 

        //Build Editor State
        const editorState = EditorState.create({
            doc: doc,
            extensions: [
                basicSetup,
                languageConf.of(javascript()),
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
            //INFO: Nothing to currently clean up, but do it here if needed
            editorView.destroy();
        }
    }, [docReady]);

    //Finally return the div
    return (
        <>
        <EditorOptions fnSetLang={(lang: string) => editorChangeSyntax.current(lang)}/>
        <div className="Editor" ref={editorDOM}>
        </div>
        </>
    );
}
