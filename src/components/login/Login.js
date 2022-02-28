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
            email: "",
            password: "",
        };
    }

    onSubmit = () => {
        this.postEmailAndPassword()
    };

    async postEmailAndPassword() {
        console.log("have been called");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            }),
        };

        try {
            console.log("am trying");
            console.log(requestOptions);
            let emailAndPasswordJSON = await fetch("http://localhost:5000/api/1/login", requestOptions).then(response => response.json());

            alert("Email and Password Sent: " + JSON.stringify(emailAndPasswordJSON));
            this.props.onHide();

        } catch (e) {
            console.log(e);
            alert("Login Failed");

            this.props.onHide();
            console.log(e);
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
                                <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
                            </Form.Group>

                            <Form.Group className="mx-5" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
                            </Form.Group>
                            <Button variant="primary" className="m-5" type="submit" disabled={!this.state.email} onClick={this.onSubmit}>
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