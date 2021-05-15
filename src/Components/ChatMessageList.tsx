import {ListGroup} from 'reactstrap';
import {v4 as uuid} from "uuid";
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
                key={uuid()}
                text={m?.text}
                type={m?.type}
                name={m?.name}
            />);
    }

    return (
        <div className="ChatMessageList">
            <div className="ChatMessageList-Header">Messages</div>
            <ListGroup type="unstyled" className="ChatMessageList-Messages">
                {msgs}
            </ListGroup>
        </div>
    );
}