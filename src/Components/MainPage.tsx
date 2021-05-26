import {Container} from "reactstrap";
import {Link} from "react-router-dom";

export default function MainPage() {
    return (
        <div className="MainPage" style={{marginTop: "100px"}}>
            <Container style={{textAlign: "center"}}>
                <h1>Code Together!</h1>
                <h3>The simple collaborative code editor.</h3>
            </Container>
            <Container style={{fontSize: "1.5rem", textAlign: "center", marginTop: "40px"}}>
                <p><Link to="/signup">Sign Up</Link> to create a coding room to share!</p>
                <p>Anyone can join a room, no sign up required!</p>
                <p>Give it a spin in the <Link to="/join-room/TestingRoom">Trial Room</Link>!</p>
            </Container>
        </div>
    )
};
