import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import ChatLog from "../helpers/ChatLog";

/*
    ChatPane serves as the parent component to both
    ChatInput and ChatMessageList
    
*/
interface IChatPane {
    messages: ChatLog,
    fnSend: Function
}
export default function ChatPane({messages, fnSend}: IChatPane) {
    return (
        <div className="ChatPane">
            <ChatMessageList messages={messages}/>
            <ChatInput fnSendMsg={fnSend}/>
        </div>
    );
}