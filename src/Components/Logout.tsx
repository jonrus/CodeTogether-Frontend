import {useEffect} from "react";
import {Alert} from "reactstrap";

interface ILogout {
    fnLogout: Function,
}
export default function Logout({fnLogout}: ILogout) {
    useEffect(() => {
        fnLogout();
    });

    return (
        <div className="LogoutPage">
            <Alert color="success">You have been logged out!</Alert>
        </div>
    );
}
