import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import ChatLog from "../helpers/ChatLog";

/*
    ChatPane serves as the parent component to both
    ChatInput and ChatMessageList
*/
interface IChatPane {
    messages: ChatLog;
}
export default function ChatPane({messages}: IChatPane) {
    return (
        <div className="ChatPane">
            <ChatMessageList messages={messages}/>
            <ChatInput />
        </div>
    );
}