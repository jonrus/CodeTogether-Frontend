import {Navbar, NavbarBrand, Nav, NavLink, NavItem, NavbarText} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import githubIcon from "./images/github.png";
import linkedinIcon from "./images/linkedin.png";
import "./css/NavBar.css"

interface NavBarProps {
    loggedIn: boolean
}

export default function NavBar({loggedIn}: NavBarProps) {
    return (
        <div>
            <Navbar color="dark" dark expand>
                <NavbarBrand tag={RRNavLink} exact to="/" style={{marginLeft: "20px"}}>
                        Code Together!
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
                    <a href="https://www.linkedin.com/in/jonathantrussell/"><img src={linkedinIcon} width="33" height="33" /></a>
                    &nbsp;
                    <a href="https://github.com/jonrus/CodeTogether"><img src={githubIcon} width="33" height="33" /></a>
                </NavbarText>
            </Navbar>
        </div>
    );
}
