import React from "react";
import {Form, FormGroup, Label, Button, Input} from "reactstrap";

/*
    ChatInput component
    Renders chat message input text box as well as send button
    slash command ala irc (/slap x) //TODO ?
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
            <Form onSubmit={handleSumbmit} id="chatInputForm" className="ChatInputForm">
                <FormGroup>
                    <Label for="chatText">Chat</Label>
                    <Input
                        type="text"
                        name="chatText"
                        id="chatText"
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