import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useState } from "react";



export default function Title() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Disaster Assesment Application</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Disaster Map</Nav.Link>
                            <Nav.Link href="#report">Report a Disaster</Nav.Link>
                            <Nav.Link href="#login">Emergency Services Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <GDPRAlert />

        </div >

    )
}

function GDPRAlert() {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Disclaimer</Alert.Heading>
                <p>
                    By proceeding with this application you are consenting to the use of your location data for routing purposes
                </p>
            </Alert>
        );
    }
    return null;
}