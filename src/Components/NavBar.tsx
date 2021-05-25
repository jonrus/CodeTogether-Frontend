import {Navbar, NavbarBrand, Nav, NavLink, NavItem, NavbarText} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import Fab from "./Fab";
import "./css/NavBar.css"

interface NavBarProps {
    loggedIn: boolean
}

export default function NavBar({loggedIn}: NavBarProps) {
    return (
        <div>
            <Navbar color="dark" dark expand>
                <NavbarBrand>
                    <NavLink tag={RRNavLink} exact to="/" className="navbar-brand">
                        Code Together!
                    </NavLink>
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={RRNavLink} exact to="/about">About</NavLink>
                    </NavItem>
                    {!loggedIn && (
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/signup">Sign Up</NavLink>
                        </NavItem>)}
                    {!loggedIn && (
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/signin">Sign In</NavLink>
                        </NavItem>)}
                    <NavItem>
                        <NavLink tag={RRNavLink} exact to="/join-room">Join Room</NavLink>
                    </NavItem>
                    {loggedIn && (
                        <>
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/create-room">Create Room</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/logout">Logout</NavLink>
                        </NavItem>
                        </>)
                    }
                </Nav>
                <NavbarText>
                    <a href="https://www.linkedin.com/in/jonathantrussell/"><Fab iconDec="fab fa-linkedin fa-2x" id="Icon-NavBar-LinkedIn" /></a>&nbsp;
                    <a href="https://github.com/jonrus/CodeTogether"><Fab iconDec="fab fa-github fa-2x" id="Icon-NavBar-Github" /></a>
                </NavbarText>
            </Navbar>
        </div>
    );
}
