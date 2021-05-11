import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

/*
    ChatPane serves as the parent component to both
    ChatInput and ChatMessageList
*/

export default function ChatPane() {
    return (
        <div className="ChatPane">
            <ChatMessageList />
            <ChatInput />
        </div>
    );
}