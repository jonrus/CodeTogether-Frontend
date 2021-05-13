import {ListGroup} from 'reactstrap';
import ChatMessage from "./ChatMessage";
import ChatLog from "../helpers/ChatLog";
/*
    ChatMessageList renders a list of all received chat messages, as a number
    of ChatMessage Components
*/

interface IChatMessageList {
    messages: ChatLog;
}
export default function ChatMessageList({messages}: IChatMessageList) {
    const msgs: JSX.Element[] = [];
    for (let m of messages) {
        msgs.push(
            <ChatMessage
                key={msgs.length}
                text={m?.text}
                type={m?.type}
                name={m?.name}
            />);
    }

    return (
        <ListGroup type="unstyled" className="ChatMessageList">
            {msgs}
        </ListGroup>
    );
}