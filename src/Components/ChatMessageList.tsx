import {ListGroup} from 'reactstrap';
import { isBreakStatement } from 'typescript';
import ChatMessage from "./ChatMessage";
/*
    ChatMessageList renders a list of all received chat messages, as a number
    of ChatMessage Components
*/

interface ChatMessageListInterface {
    foo: string
}

export default function ChatMessageList() {
    const testMessages = [
        {
            user: "batman",
            text: "I'm Batman"
        },
        {
            user: "batman",
            text: "I'm Batman"
        },
        {
            user: "batman",
            text: "I'm Batman"
        },
    ];

    const msgs = testMessages.map(msg => (<ChatMessage userName={msg.user} message={msg.text} />));
    return (
        <ListGroup type="unstyled" className="ChatMessageList">
            {msgs}
        </ListGroup>
    );
}