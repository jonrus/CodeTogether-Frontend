import React, {useState} from "react";
import {Redirect, useParams} from "react-router";
import {Link} from "react-router-dom";
import {Alert, Container, Form, FormGroup, Input, Label, Button} from "reactstrap";
import ApiHelper from "../api/ApiHelper";

interface JoinRoomPageProps {
    join: Function,
    uName?: string
}

export default function JoinRoomPage({join, uName}: JoinRoomPageProps) {
    const {id} = useParams<{id: string}>();
    const DEFAULT_STATE = {
        username: uName,
        roomid: id ?? ""
    }
    const [saved, setSaved] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [formData, setFormData] = useState(DEFAULT_STATE);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //Prevent guest users from creating rooms
        const res = await ApiHelper.checkRoomName(formData.roomid);
        if (res.isRoom === true) {
            join(formData.username);
            setSaved(true);
        }
        else {
            setFormData(DEFAULT_STATE);
            setError(true);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(current => ({
            ...current,
            [name]: value
        }));
    }

    if (saved) return (<Redirect to={`/room/${formData.roomid}`} />);
    return (
        <Container>
            {error && <div className="JoinRoomPage-Error">
            <Alert color="danger">
                <p>Room does not exist!<br/> Check room name and try again</p>
                <p><Link to="/signin">Sign In</Link> or <Link to="/signup">Sign Up</Link> to create your own rooms!</p>
            </Alert></div>}
            <Form onSubmit={handleSubmit} className="JoinRoomPage-Form">
                {!uName &&<FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        autoComplete="off"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                </FormGroup>}
                {uName &&<FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        autoComplete="off"
                        required
                        disabled
                        value={formData.username}
                    />
                </FormGroup>}
                {!id && <FormGroup>
                    <Label for="roomid">Room ID</Label>
                    <Input
                        type="text"
                        name="roomid"
                        id="roomid"
                        autoComplete="off"
                        required
                        value={formData.roomid}
                        onChange={handleChange}
                    />
                </FormGroup>}
                {id && <FormGroup>
                    <Label for="roomid">Room ID</Label>
                    <Input
                        type="text"
                        name="roomid"
                        id="roomid"
                        autoComplete="off"
                        required
                        disabled
                        value={formData.roomid}
                    />
                </FormGroup>}
                <Button color="primary">Join Room!</Button>
            </Form>
        </Container>
    );
}
