/*
    ChatMessage is the component to render a single chat message
    The parent component (blahfdljklfdsa) will render a number of these.
*/
interface ChatMessageInterface {
    userName: string,
    type?: string,  //!Make required
    message: string
}

export default function ChatMessage({userName, message}: ChatMessageInterface) {
    return (
        <li>
            <strong>{userName}</strong>:&nbsp;{message}
        </li>
    )
};