import {useEffect, useRef} from "react";
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {Update} from "@codemirror/collab";
import {javascript} from "@codemirror/lang-javascript"

interface IEditor {
    version: number,
    doc: string
}

export default function Editor({version, doc}: IEditor) {
    const editorDOM = useRef<HTMLDivElement>(null);
    const localVersion = useRef<number>(0); 
    let view: EditorView;

    useEffect(() => {
        if (!editorDOM.current) throw Error("editorDOM is unassigned");

        //Build the editor and attach to DOM element
        view = new EditorView({
        state: EditorState.create({extensions: [basicSetup, javascript()]}),
        parent: editorDOM.current
        });

        //Finished up give the editor focus
        view.focus();
    }, []);

    useEffect(() => {
        https://github.com/codemirror/website/blob/master/site/examples/collab/collab.ts
        
    }, [version])

    return (
        <div className="Editor" ref={editorDOM}>
        </div>
    );
}