import {useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import AboutPage from "./AboutPage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Layout from "./Layout";

/*
    Router for the various routes/views
    Also storage location of some bits of state/refs and functions to
    log in/out         //TODO
    register           //TODO
    set visitor name - via join room page
*/
export default function Routes() {
    const [isNameSet, setIsNameSet] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");

    const handleJoinRoom = (name: string) => {
        setUserName(name);
    }

    return (
        <>
            <NavBar loggedIn={isLoggedIn}/>
            <Switch>
                <Route exact path="/about">
                    <AboutPage />
                </Route>
                <Route exact path="/signup">
                    <SignUpPage />
                </Route>
                <Route exact path="/signin">
                    <SignInPage />
                </Route>
                <Route path="/join-room/:id">
                    <JoinRoomPage
                        join={handleJoinRoom}
                        uName={userName}
                    />
                </Route>
                <Route exact path="/join-room">
                    <JoinRoomPage
                        join={handleJoinRoom}
                        uName={userName}
                    />
                </Route>
                <Route exact path="/create-room">
                    <CreateRoomPage />
                </Route>
                <Route path="/room/:roomID">
                    <Layout username={userName} isLoggedIn={isLoggedIn} />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    )
}