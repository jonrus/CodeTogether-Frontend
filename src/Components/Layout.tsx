import {useRef} from "react";
import {Redirect, useParams} from "react-router";
import {Container, Col, Row} from "reactstrap"
import useWebSocket from "react-use-websocket";
import ChatLog from "../helpers/ChatLog";
import {Update} from "@codemirror/collab";
import {ChangeSet} from "@codemirror/state";

//Child Components 
import ChatPane from "./ChatPane";
import RoomMembersList from "./RoomMembersList";
import Editor from "./Editor";

/*
    Layout component is a wrapper for all of the sub components
    Layout contains all websocket logic/data
*/

interface LayoutProps {
    username: string,
    isLoggedIn: boolean,
    isOwner?: boolean
}
interface ICursorData {
    name: string,
    color: string,
    from: number,
    to: number
}

export default function Layout(p: LayoutProps) {
    const {roomID} = useParams<{roomID: string}>();
    const wsURL = `ws://127.0.0.1:3001/room/${roomID}`;
    const chatHistory = useRef(new ChatLog()); //* helpers/ChatLog.ts
    const memberList = useRef<string[]>([]);
    const memberCursors = useRef<ICursorData[]>([]);
    const hasCursorsUpdate = useRef<boolean>(false);
    const docVersion = useRef<number>(-1);
    const docText = useRef<string>("");
    const docChanges = useRef<Update[]>([]);
    const docLoaded = useRef<boolean>(false);

    const handleWsOpen = () => {
        console.info("Websocket Opened");
        sendJsonMessage({type: "join", name: p.username});
    }
    const handleWsError = () => {
        console.error(`Websocket error`)
    }
    const handleWsClose = (e: WebSocketEventMap['close']) => {
        console.info(`Websocket closed: ${e.reason}`);
    }
    const handleWsMsg = (e: WebSocketEventMap['message']) => {
        // console.info(`New message: ${e.data}`);

        const msgData = JSON.parse(e.data);
        switch (msgData.type) {
            case "chat":
            case "join":
            case "note":
                chatHistory.current.addMsg(msgData);
                break;
            case "members":
                memberList.current = msgData.names;
                break;
            case "editor-Doc":
                docVersion.current = msgData.version as number;
                docText.current = msgData.doc;
                docLoaded.current = true;
                break;
            case "editor-Changes":
                docChanges.current = msgData.changes.map((c: any) => ({
                    changes: ChangeSet.fromJSON(c.changes),
                    clientID: c.clientID
                }));
                memberCursors.current = msgData.cursors;
                hasCursorsUpdate.current = true;
                break;
            default:
                console.error(`Unknown msg: raw => ${e.data}`);
                break;
        }
    }
    const {sendJsonMessage, lastMessage, readyState} = useWebSocket(wsURL, {
        onOpen: handleWsOpen,
        onClose: handleWsClose,
        onError: handleWsError,
        onMessage: handleWsMsg 
    });

    const pullUpdates = (version: number) => {
        return docChanges.current.slice((version - docVersion.current));
    }

    const pullCursorUpdates = () => {
        return memberCursors.current;
    }
    const hasCursorUpdates = () => {
        if (hasCursorsUpdate.current) {
            hasCursorsUpdate.current = false;
            return true;
        }

        return false;
    }
    
    const pushUpdates = (version: number, fullUpdates: Update[], cursor: {head: number, from: number, to: number}) => {
        //Strip transaction data
        const updates = fullUpdates.map(u => ({
            clientID: u.clientID,
            changes: u.changes.toJSON(),
        }));
        const data = {
            type: "editor-PushChanges",
            updates,
            version,
            selection: {head: cursor.head, from: cursor.from, to: cursor.to}
        };
        sendJsonMessage(data);
    }

    if (!p.username) return (<Redirect to={`/join-room/${roomID}`} />);
    return (
        <Container fluid>
            <Row>
                <Col xs="2">
                    <RoomMembersList members={memberList.current} />
                    <ChatPane
                        messages={chatHistory.current}
                        fnSend={sendJsonMessage}
                    />
                </Col>
                <Col>
                    <Editor
                        user={p.username}
                        version={docVersion.current}
                        doc={docText.current}
                        docReady={docLoaded.current}
                        fnPullUpdates={pullUpdates}
                        fnPushUpdates={pushUpdates}
                        fnPullCursors={pullCursorUpdates}
                        fnHasCursorUpdate={hasCursorUpdates}
                    />
                </Col>
            </Row>
        </Container>
    );
}