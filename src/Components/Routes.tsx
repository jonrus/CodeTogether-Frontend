import {useState, useRef} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import AboutPage from "./AboutPage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Layout from "./Layout";
import Logout from "./Logout";

/*
    Router for the various routes/views
    Also storage location of some bits of state/refs and functions to
    log in/out
    register
    set visitor name - via join room page
*/
export default function Routes() {
    const [isNameSet, setIsNameSet] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const userToken = useRef<string>("");
    const [userName, setUserName] = useState<string>("");

    const handleJoinRoom = (name: string) => {
        setUserName(name);
    }
    const handleLogIn = (username: string, token: string) => {
        setUserName(username);
        userToken.current = token;
        setIsLoggedIn(true);
    }
    const handleLogOut = () => {
        setUserName("");
        userToken.current = "";
        setIsLoggedIn(false);
    }

    return (
        <>
            <NavBar loggedIn={isLoggedIn}/>
            <Switch>
                <Route exact path="/about">
                    <AboutPage />
                </Route>
                <Route exact path="/signup">
                    <SignUpPage fnSignUp={handleLogIn}/>
                </Route>
                <Route exact path="/signin">
                    <SignInPage fnSignIn={handleLogIn}/>
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
                <Route path="/logout">
                    <Logout fnLogout={handleLogOut} />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    )
}
