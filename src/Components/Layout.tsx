import {Container, Col, Row} from "reactstrap"
//Child Components 
import ChatPane from "./ChatPane";

/*
    Layout component is a simple wrapper for all of the sub components
*/
export default function Layout() {
    return (
        <Container fluid>
            <Row>
                <Col xs="2">PEOPLES</Col>
                <Col>EDITOR</Col>
            </Row>
            <Row>
                <Col xs="2"><ChatPane /></Col>
            </Row>
        </Container>
    );
}