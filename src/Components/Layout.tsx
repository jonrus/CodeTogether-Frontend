import {useState, useRef} from "react";
import {Redirect, useParams} from "react-router";
import {Container, Col, Row} from "reactstrap"
import useWebSocket from "react-use-websocket";
import ChatLog from "../helpers/ChatLog";
//Child Components 
import ChatPane from "./ChatPane";
import RoomMembersList from "./RoomMembersList";
import RoomMembers from "./RoomMembersList";

/*
    Layout component is a wrapper for all of the sub components
    Layout contains all websocket logic/data
*/

interface LayoutProps {
    username: string,
    isLoggedIn: boolean,
    isOwner?: boolean
}

export default function Layout(p: LayoutProps) {
    const {roomID} = useParams<{roomID: string}>();
    const wsURL = `ws://127.0.0.1:3001/room/${roomID}`;
    const chatHistory = useRef(new ChatLog()); //* helpers/ChatLog.ts
    const memberList = useRef<string[]>([]);

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
        console.info(`New message: ${e.data}`);
        const msgData = JSON.parse(e.data);

        switch (msgData.type) {
            case "chat":
            case "join":
            case "note":
                chatHistory.current.addMsg(msgData);
                break;
            case "members":
                memberList.current = msgData.names;
                console.log(memberList.current);
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



    if (!p.username) return (<Redirect to="/join-room" />);
    return (
        <Container fluid>
            <Row>
                <Col xs="2">
                    <RoomMembersList members={memberList.current} />
                </Col>
                <Col>EDITOR</Col>
            </Row>
            <Row>
                <Col xs="2">
                    <ChatPane
                        messages={chatHistory.current}
                        fnSend={sendJsonMessage}
                    />
                </Col>
            </Row>
        </Container>
    );
}