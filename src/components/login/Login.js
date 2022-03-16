import React from "react";
import { Component } from 'react/cjs/react.production.min';
import Title from "../Title"
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {useTranslation} from "react-i18next";

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
                                <Form.Label><TranslatedTextEmail/></Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} />
                            </Form.Group>

                            <Form.Group className="mx-5" controlId="formBasicPassword">
                                <Form.Label><TranslatedTextPassword/></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Button variant="primary" className="m-5" type="submit" disabled={!this.state.value}>
                                <TranslatedTextButton/>
                            </Button>
                        </Form>
                    </Container>

                </div>

            </main>
        </>)

    }
};

function TranslatedTextEmail() {
    const {t} = useTranslation()
    return t("EMAIL")
}

function TranslatedTextPassword() {
    const {t} = useTranslation()
    return t("PASSWORD")
}

function TranslatedTextButton() {
    const {t} = useTranslation()
    return t("Submit")
}

export default Login;
