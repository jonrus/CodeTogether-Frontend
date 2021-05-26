import {Container} from "reactstrap";
import neovim from "./images/neovim.png";
import ubuntu from "./images/ubuntu.png";

export default function AboutPage() {
    return (
        <div className="AboutPage">
            <Container style={{fontSize: "1.5rem"}}>
                <p>Code Together! is the final project in a software engineering course. Code Together! Leverages technologies such as <a href="https://reactjs.org/">React</a>, Web sockets and the fantastic <a href="https://codemirror.net/6/">CodeMirror 6</a> to deliver a simple and unique online collaborative coding experience.</p>
                <p>Code Together! is free to use, and developed from a privacy first view. Very little user data is stored, only usernames and a hashed password, for registered users. User registration is optional, only required to create a coding room. Guest users can join any created room with the room ID or a link.</p>
                <p>The documents created by the users are stored server side, in memory only, for the duration of the session. Once the last participant leaves, the document as well as the room and all data associated with it is deleted. Room chats are performed via relay only, and are not stored on the server at anytime.</p>
                <p>Code Together! is open source. The code for the project can be found on <a href="https://github.com/jonrus/CodeTogether">GitHub</a>.</p>
                <p>Finally, Code Together! was made by Jon Russell. I'm always open to opportunities, so please get in touch via <a href="https://www.linkedin.com/in/jonathantrussell/">LinkedIn</a>.</p>
                <p>Made with <a href="https://neovim.io"><img src={neovim} alt="NeoVim" width="44" height="44"/></a> on <a href="https://ubuntu.com/"><img src={ubuntu} alt="Ubuntu" width="44" height="44"/></a></p>
            </Container>
        </div>
    )
};
