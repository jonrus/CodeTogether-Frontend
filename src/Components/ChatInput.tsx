import React from "react";
import {Form, FormGroup, Button, Input} from "reactstrap";

/*
    ChatInput component
    Renders chat message input text box as well as send button
    fnSendMsg is passed down from the Layout Component.
*/
interface ChatInputInterface {
    fnSendMsg: Function
}

export default function ChatInput({fnSendMsg}: ChatInputInterface) {
    const [chatMsg, setChatMsg] = React.useState<string>("");

    const handleSumbmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (chatMsg !== "") {
            fnSendMsg({type: "chat", text: chatMsg});
            setChatMsg("");
        }
    }

    const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatMsg(e.target.value);
    }

    return (
        <div className="ChatInput">
            <Form onSubmit={handleSumbmit} id="chatInputForm" className="ChatInput-Form">
                <FormGroup>
                    <Input
                        type="text"
                        name="chatTextBox"
                        id="chatTextBox"
                        placeholder="Chat Message"
                        autoComplete="off"
                        value={chatMsg}
                        onChange={handleChage}
                    />
                    <Button type="submit">Send</Button>
                </FormGroup>
            </Form>
        </div>
    );
}