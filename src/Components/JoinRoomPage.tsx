import React, {useState} from "react";
import { Redirect, useParams } from "react-router";
import {Form, FormGroup, Input, Label, Button} from "reactstrap";
interface JoinRoomPageProps {
    join: Function,
    uName?: string
}

export default function JoinRoomPage({join, uName}: JoinRoomPageProps) {
    const {id} = useParams<{id: string}>();
    const DEFAULT_STATE = {
        username: uName,
        roomid: id
    }
    const [saved, setSaved] = useState<boolean>(false);
    const [formData, setFormData] = useState(DEFAULT_STATE);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        join(formData.username);
        setSaved(true);
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
                <Button>Join Room!</Button>
            </Form>
        </div>
    );
}