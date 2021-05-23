import {useState} from "react";
import {Redirect} from "react-router";
import {Alert, Form, FormGroup, Input, Label, Button} from "reactstrap";
import ApiHelper from "../api/ApiHelper";

interface ISignInPage {
    fnSignIn(username: string, token: string): void
}
export default function SignInPage({fnSignIn}: ISignInPage) {
    const login = async () => {
        try {
            const token = await ApiHelper.logIn(formData.username, formData.password);
            fnSignIn(formData.username, token)
            setSaved(true);
        }
        catch (e){
            setFormData(DEFAULT_STATE);
            setError(true);
        }
    };

    const DEFAULT_STATE = {
        username: "",
        password: ""
    }
    const [saved, setSaved] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [formData, setFormData] = useState(DEFAULT_STATE);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(current => ({
            ...current,
            [name]: value
        }));
    }

    if (saved) return (<Redirect to={"/"} />);
    return (
        <div className="SignInPage-Form">
            {error && <Alert color="danger">Username/Password Incorrect</Alert>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
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
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        required
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button>Join Room!</Button>
            </Form>
        </div>
    );
}
