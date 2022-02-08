import React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';



export default function Title() {
    return (
        <div>


            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <button
                style={{
                    fontSize: 25,
                    color: "white",
                    justifyContent: "center",
                    backgroundColor: 'teal',
                    position: 'absolute',
                    right: 7,
                    top: 7,
                    borderRadius: 5
                }}
                className='btn'>
                {"Emergency Services Login"}
            </button>

            <button
                style={{
                    fontSize: 25,
                    justifyContent: "center",
                    backgroundColor: 'fuchsia',
                    position: 'absolute',
                    left: 7,
                    top: 7,
                    borderRadius: 5
                }}
                className='btn'>
                {"Help"}
            </button>

            <div
                style={{
                    fontSize: 30,
                    fontWeight: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white"
                }}

            >
                Disaster Assesment Application
            </div> */}

        </div >

    )
}