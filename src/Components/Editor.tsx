import {useEffect, useRef} from "react";
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {javascript} from "@codemirror/lang-javascript"

export default function Editor() {
    const editorDOM = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!editorDOM.current) throw Error("editorDOM is unassigned");

        //Build the editor and attach to DOM element
        let view = new EditorView({
        state: EditorState.create({extensions: [basicSetup, javascript()]}),
        parent: editorDOM.current
        });

        //Finished up give the editor focus
        view.focus();
    }, []);

    return (
        <div className="Editor" ref={editorDOM}>
        </div>
    );
}