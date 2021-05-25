import {useState} from "react";
import {Redirect} from "react-router";
import {Alert, Form, FormGroup, Input, Label, Button, Container, Row, Col} from "reactstrap";
import ApiHelper from "../api/ApiHelper";

/*
    SingInPage Component
    Allows user to sign in, via ApiHelper and pushes user data to
    Routes component, where it can be used elsewhere.
*/

interface ISignInPage {
    fnSignIn(username: string, token: string): void
}

export default function SignInPage({fnSignIn}: ISignInPage) {
    const login = async () => {
        try {
            const res = await ApiHelper.logIn(formData.username, formData.password);
            fnSignIn(formData.username, res.token)
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

    if (saved) return (<Redirect to={"/create-room"} />);
    return (
        <div className="SignInPage-Form">
            <Container fluid="md">
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
                    <Button color="primary">Sign In!</Button>
                </Form>
            </Container>
        </div>
    );
}
