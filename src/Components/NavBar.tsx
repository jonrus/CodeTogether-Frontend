import {Navbar, Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import "./css/NavBar.css"

interface NavBarProps {
    loggedIn: boolean
}

export default function NavBar({loggedIn}: NavBarProps) {
    return (
        <div className="NavBar">
            <Navbar expand="md">
                <NavLink exact to="/" className="navbar-brand">
                    Code Together!
                </NavLink>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink exact to="/about">About</NavLink>
                    </NavItem>
                    {!loggedIn && (
                        <NavItem>
                            <NavLink exact to="/signup">Sign Up</NavLink>
                        </NavItem>)}
                    {!loggedIn && (
                        <NavItem>
                            <NavLink exact to="/signin">Sign In</NavLink>
                        </NavItem>)}
                    <NavItem>
                        <NavLink exact to="/join-room">Join Room</NavLink>
                    </NavItem>
                    {loggedIn && (
                        <>
                        <NavItem>
                            <NavLink exact to="/create-room">Create Room</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to="/logout">Logout</NavLink>
                        </NavItem>
                        </>)
                    }
                </Nav>
            </Navbar>
        </div>
    );
}
