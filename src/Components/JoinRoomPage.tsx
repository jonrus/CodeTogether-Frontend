import React, {useState, useRef} from "react";
import { Redirect } from "react-router";
import {Form, FormGroup, Input, Label, Button} from "reactstrap";
interface JoinRoomPageProps {
    join: Function,
    uName: string
}

export default function JoinRoomPage({join, uName}: JoinRoomPageProps) {
    const DEFAULT_STATE = {
        username: uName,
        roomid: ""
    }
    const [saved, setSaved] = useState<boolean>(false);
    const [formData, setFormData] = useState(DEFAULT_STATE);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        join(formData.roomid, formData.username);
        setSaved(true);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(current => ({
            ...current,
            [name]: value
        }));
    }

    if (saved) return (<Redirect to="/" />);
    return (
        <div className="JoinRoomPage-Form">
            <Form onSubmit={handleSubmit}>
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
                <FormGroup>
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
                </FormGroup>
                <Button>Join Room!</Button>
            </Form>
        </div>
    );
}