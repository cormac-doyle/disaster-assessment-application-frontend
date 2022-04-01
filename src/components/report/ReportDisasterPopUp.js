import React, { Component } from "react";
import "./ReportDisasterPopUp.css";
import { Modal, Button, Dropdown } from "react-bootstrap";



class ReportDisasterPopUp extends Component {
  langTextMap={
    "Disaster Report" : 
      {"ire":"Tuairisc Thubaiste",
      "eng":"Disaster Report"}, 
    "Would you like to report a disaster at this location?": 
      {"ire":"Ar mhaith leat tuairisc a dhéanamh ar thubaiste ar an suíomh seo?", 
        "eng":"Would you like to report a disaster at this location?"},
    "Longitude": 
      {"ire":"Domhanfhad",
        "eng":"Longitude"},
    "Latitude": 
      {"ire":"Domhanleithead", 
        "eng":"Latitude"},
    "Disaster Radius":
      {"ire":"Raon Tubaiste", 
      "eng":"Disaster Radius"},
    "Disaster Type": 
      {"ire":"Saghas Tubaiste",
      "eng":"Disaster Type"},
    "Select Scale": 
      {"ire":"Roghnaigh Scála",
      "eng":"Select Scale"}
  
  }
  
  constructor(props) {
    super(props);
    this.state = {
      type: -1,
      scale: -1,
      radius: 0,
      language: "eng"
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState(() => ({
        type: -1,
        scale: -1,
        radius: 0,
        language: this.props.language
      }))
    }
  }

  confirmButtonClick(event) {
    if (this.state.scale !== -1 && this.state.type !== -1) {
      this.postDisasterLocation();
    } else {

    }
  }

  async postDisasterLocation() {
    const requestOptions = {
      method: "post",
      //mode: 'no-cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        scale: this.state.scale,
        disaster_type: this.state.type,
        long: this.props.position.lng,
        lat: this.props.position.lat,
        radius: this.state.radius
      }),
    };

    try {
      let disasterLocationJSON = await fetch("https://ase-backend-2.herokuapp.com/api/1/disasters-civ/", requestOptions).then(response => response.json());

      alert("Disaster Reported: " + JSON.stringify(disasterLocationJSON));
      this.props.onHide();

    } catch (e) {
      alert("Report Disaster Failed");

      this.props.onHide();
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>{ this.langTextMap["Disaster Report"][this.state.language]} </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{ this.langTextMap["Would you like to report a disaster at this location?"][this.state.language]}  </h3>
            <div>{ this.langTextMap["Longitude"][this.state.language]} {this.props.position.lng.toFixed(3)} { this.langTextMap["Latitude"][this.state.language]} {this.props.position.lat.toFixed(3)}</div>
            {this.scaleDropDown()}
            {this.disasterTypeDropDown()}
            {this.disasterRadius()}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.confirmButtonClick()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  disasterRadius() {

    return <>
      <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">
          
          { this.langTextMap["Disaster Radius"][this.state.language]}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 0 })}>0m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 100 })}>100m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 200 })}>200m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 300 })}>300m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 400 })}>400m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 500 })}>500m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 600 })}>600m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 700 })}>700m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 800 })}>800m</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ radius: 900 })}>900m</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    </>

  }

  disasterTypeDropDown() {
    return <>
      <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">

          { this.langTextMap["Disaster Type"][this.state.language]}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 0 })}>FIRE/TINE</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 1 })}>FLOOD/TUILE</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 2 })}>TRAFFIC INCIDENT/EACHTRA TRÁCHT</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 3 })}>PUBLIC DISTURBANCE/ACHRANN POBLACH</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 4 })}>BIO HAZARD/BITHGHUAIS</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 5 })}>METEOR/DREIGE</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 6 })}>STORM/STOIRM</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 7 })}>OTHER/EILE</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

    </>
  }

  scaleDropDown() {
    return <>
      <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">
          
          { this.langTextMap["Select Scale"][this.state.language]}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.setState({ scale: 1 })}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 2 })}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 3 })}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 4 })}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 5 })}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 6 })}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 7 })}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 8 })}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 9 })}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({ scale: 10 })}>10</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  }
}

export default ReportDisasterPopUp;
