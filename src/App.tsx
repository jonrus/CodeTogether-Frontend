import {useState, useRef} from "react";
import useWebSocket from "react-use-websocket";
import Routes from "./Components/Routes";

function App() {
  const [wsURL, setWsURL] = useState<string>("ws://127.0.0.1:3001/room/a");
  const chatHistory = useRef([]);

  const handleWsOpen = () => {
    console.log("Websocket Opened");
    sendJsonMessage({type: "join", name: "lazorGator"});
  }
  const handleWsError = () => {
    console.error(`Websocket error`)
  }
  const handleWsClose = (e: WebSocketEventMap['close']) => {
    console.log(`Websocket closed: ${e.reason}`);
  }
  const handleWsMsg = (e: WebSocketEventMap['message']) => {
    console.log(`New message: ${e.data}`);
  }
  const {sendJsonMessage, lastMessage, readyState} = useWebSocket(wsURL, {
    onOpen: handleWsOpen,
    onClose: (e) => (handleWsClose(e)),
    onError: handleWsError,
    onMessage: handleWsMsg 
  });

  return (
    <div className="app">
      <Routes />
    </div>
  );
}

export default App;
