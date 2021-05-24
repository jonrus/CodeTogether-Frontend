import {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {Container, Row, Col, FormGroup, Form, Input, Label, Button, Jumbotron} from "reactstrap";
import ApiHelper from "../api/ApiHelper"

interface ICreateRoomPage {
    isLoggedIn: boolean,
    token: string
}
export default function CreateRoomPage({isLoggedIn, token}: ICreateRoomPage) {
    const [saved, setSaved] = useState<boolean>(false);
    const [roomID, setRoomID] = useState<string>("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
    }

    useEffect(() => {
        const getRoomName = async () => {
            const res = await ApiHelper.getRoomName(token);
            if (!res.error) setRoomID(res.roomName);
        }

        getRoomName();
    }, []);

    if (!isLoggedIn) return (<Redirect to={"/"} />);
    if (saved) return (<Redirect to={`/room/${roomID}`} />);
    return (
        <div className="CreateRoomPage">
            <Container>
            <Row>
                <Col>
                    <h1 className="display-3">Create a new room!</h1>
                    <p className="lead">Invite as many people as you like to share this programing room with you!</p>
                    <hr className="my-2" />
                    <Form onSubmit={handleSubmit} className="CreateRoomPage-Form">
                        <FormGroup>
                            <Label for="roomid">Room ID</Label>
                            <Input
                                type="text"
                                name="roomid"
                                id="roomid"
                                disabled
                                value={roomID}
                            />
                        </FormGroup>
                        <Button color="primary">Create Room</Button>
                    </Form>
                </Col>
            </Row>
            </Container>
        </div>
    );
}
