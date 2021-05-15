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
    let msgKey: number = 0; //Lazy method of assigning a key...
    for (let m of messages) {
        msgs.push(
            <ChatMessage
                key={msgKey}
                text={m?.text}
                type={m?.type}
                name={m?.name}
            />);

        msgKey++;
    }

    return (
        <ListGroup type="unstyled" className="ChatMessageList">
            {msgs}
        </ListGroup>
    );
}