import React from "react";
import { Component } from 'react/cjs/react.production.min';
import Title from "../Title"
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }

    render() {
        return (<>
            <nav>
            </nav>
            <main>

                <Title />
                <div>
                    <Container>
                        <Form>
                            <Form.Group className="mx-5" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mx-5" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className="m-5" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>

                </div>

            </main>
        </>)

    }
};

export default Login;