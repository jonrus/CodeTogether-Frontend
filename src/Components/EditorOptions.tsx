import {useState} from "react";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

interface IEditorOptions {
    fnSetLang: Function
}
export default function EditorOptions({fnSetLang}: IEditorOptions) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prev => !prev);
    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="right">
                <DropdownToggle caret>
                    Syntax
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => fnSetLang("cpp")}>C++</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("css")}>CSS</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("html")}>HTML</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("java")}>Java</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("javascript")}>JavaScript</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("json")}>JSON</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("markdown")}>Markdown</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("python")}>Python</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("rust")}>Rust</DropdownItem>
                    <DropdownItem onClick={() => fnSetLang("sql")}>SQL</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
