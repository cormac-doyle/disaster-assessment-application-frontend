import React from "react";
import { Component } from 'react/cjs/react.production.min';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setToken } from "./Auth";
import { Button, Form, Container } from "react-bootstrap";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { urlVar } from '../../url_confg'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            email: "",
            password: "",
            redirect: false
        };
    }

    onSubmit() {
        this.postEmailAndPassword()
    };


    postEmailAndPassword() {

        const requestOptions = {
            method: "post",
            //mode: 'no-cors',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            }),
        };



        fetch(urlVar + "/api/1/login", requestOptions)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()
            })
            .then(json => {
                alert("Logged in!");
                setToken(json.token)
                this.props.navigate('/disaster_verification');
                //this.setState({ redirect: true })
                //useNavigate("/disaster_verification")


            }).catch(error => {
                alert("Log in failed...");
                console.log(error)

            });


    }

    handleEntailmentRequest(e) {
        e.preventDefault();
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
                                <Form.Label><TranslatedTextEmail /></Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
                            </Form.Group>

                            <Form.Group className="mx-5" controlId="formBasicPassword">
                                <Form.Label><TranslatedTextPassword /></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
                            </Form.Group>
                            <Button variant="primary" className="m-5" type="submit" disabled={!this.state.email} onClick={(e) => { this.handleEntailmentRequest(e); this.onSubmit(); }}>
                                <TranslatedTextButton />
                            </Button>
                        </Form>
                    </Container>

                </div>

            </main>
        </>)
    }
};

function TranslatedTextEmail() {
    const { t } = useTranslation()
    return t("EMAIL")
}

function TranslatedTextPassword() {
    const { t } = useTranslation()
    return t("PASSWORD")
}

function TranslatedTextButton() {
    const { t } = useTranslation()
    return t("Submit")
}


function WithNavigate(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />



}


// export default Login;
export default WithNavigate;