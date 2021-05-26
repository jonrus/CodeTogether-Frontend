import {useState} from "react";
import {Redirect} from "react-router";
import {Container, Alert, Form, FormGroup, Input, Label, Button} from "reactstrap";
import ApiHelper from "../api/ApiHelper";

interface ISignUpPage {
    fnSignUp(username: string, token: string): void
}
export default function SignUpPage({fnSignUp}: ISignUpPage) {
    const login = async () => {
        try {
            const token = await ApiHelper.signUp(formData.username, formData.password);
            fnSignUp(formData.username, token)
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
        <div className="SignUpPage-Form">
            <Container style={{marginBottom: "20px"}}>
                Sign Up is required to create rooms.
            </Container>
            <Container>
                {error && <Alert color="danger">Username in use, try again!</Alert>}
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
                            maxLength={20}
                            minLength={1}
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
                            minLength={4}
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button color="primary">Sign Up!</Button>
                </Form>
            </Container>
        </div>
    );
}
