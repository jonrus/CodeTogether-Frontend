import {memo} from "react";
import "./css/ChatMessage.css";

/*
    ChatMessage is the component to render a single chat message
    The parent component (ChatMessageList) will render a number of these.
    The component is ran though React.memo()... Seems like a good idea.
*/

interface ChatMessageInterface {
    name?: string,
    type?: string,
    text?: string
}

function ChatMessage({name, text, type}: ChatMessageInterface) {
    return(
        <span className={`ChatMessage-${type}`}>{text}</span>
    );
};

export default memo(ChatMessage);