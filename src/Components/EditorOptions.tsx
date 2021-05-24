import {useState} from "react";
import {Form, FormGroup, Input, Label} from "reactstrap";

interface IEditorOptions {
    fnSetLang: Function
}
export default function EditorOptions({fnSetLang}: IEditorOptions) {
    const DEFAULT_STATE = {
        language: "javascript"
    }
    const [settingsData, setSettingsData] = useState(DEFAULT_STATE);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSettingsData(current => ({
            ...current,
            [name]: value
        }));
        //Push settings
        fnSetLang(value);
    }

    return (
        <div className="EditorOptions">
            <Form>
                <FormGroup>
                    <Label for="language">Syntax</Label>
                    <Input type="select" name="language" id="language" value={settingsData.language} onChange={handleChange}>
                        <option value="cpp">C++</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="json">JSON</option>
                        <option value="markdown">Markdown</option>
                        <option value="python">Python</option>
                        <option value="rust">Rust</option>
                        <option value="sql">SQL</option>
                    </Input>
                </FormGroup>
            </Form>
        </div>
    );
}
