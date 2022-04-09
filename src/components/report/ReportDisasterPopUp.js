import React, { Component } from "react";
import "./ReportDisasterPopUp.css";
import { Modal, Button, Dropdown } from "react-bootstrap";
import cookies from 'js-cookie'



function getLanguage() {
  const currentLanguageCode = cookies.get('i18next')
  return currentLanguageCode
}

class ReportDisasterPopUp extends Component {
  langTextMap = {
    "Disaster Report":
    {
      "ga": "Tuairisc Thubaiste",
      "en": "Disaster Report"
    },
    "Would you like to report a disaster at this location?":
    {
      "ga": "Ar mhaith leat tuairisc a dhéanamh ar thubaiste ar an suíomh seo?",
      "en": "Would you like to report a disaster at this location?"
    },
    "Longitude":
    {
      "ga": "Domhanfhad",
      "en": "Longitude"
    },
    "Latitude":
    {
      "ga": "Domhanleithead",
      "en": "Latitude"
    },
    "Disaster Radius":
    {
      "ga": "Raon Tubaiste",
      "en": "Disaster Radius"
    },
    "Disaster Type":
    {
      "ga": "Saghas Tubaiste",
      "en": "Disaster Type"
    },
    "Select Scale":
    {
      "ga": "Roghnaigh Scála",
      "en": "Select Scale"
    },
    "FIRE":
    {
      "ga": "TINE",
      "en": "FIRE"
    },
    "FLOOD":
    {
      "ga": "TUILE",
      "en": "FLOOD"
    },
    "TRAFFIC INCIDENT":
    {
      "ga": "EACHTRA TRÁCHT",
      "en": "TRAFFIC INCIDENT"
    },
    "PUBLIC DISTURBANCE":
    {
      "ga": "ACHRANN POBLACH",
      "en": "PUBLIC DISTURBANCE"
    },
    "BIO HAZARD":
    {
      "ga": "BITHGHUAIS",
      "en": "BIO HAZARD"
    },
    "METEOR":
    {
      "ga": "DREIGE",
      "en": "METEOR"
    },
    "STORM":
    {
      "ga": "STOIRM",
      "en": "STORM"
    },
    "OTHER":
    {
      "ga": "EILE",
      "en": "OTHER"
    },
    "Confirm":
    {
      "ga": "Deimhnigh",
      "en": "Confirm"
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      type: -1,
      scale: -1,
      radius: 0,
      language: props.language
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
              <h1>{this.langTextMap["Disaster Report"][getLanguage()]} </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{this.langTextMap["Would you like to report a disaster at this location?"][getLanguage()]}  </h3>
            <div>{this.langTextMap["Longitude"][getLanguage()]} {this.props.position.lng.toFixed(3)} {this.langTextMap["Latitude"][getLanguage()]} {this.props.position.lat.toFixed(3)}</div>
            {this.scaleDropDown()}
            {this.disasterTypeDropDown()}
            {this.disasterRadius()}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.confirmButtonClick()}>
              {this.langTextMap["Confirm"][getLanguage()]}
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

          {this.langTextMap["Disaster Radius"][getLanguage()]}
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

          {this.langTextMap["Disaster Type"][getLanguage()]}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 0 })}>{this.langTextMap["FIRE"][getLanguage()]}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 1 })}>{this.langTextMap["FLOOD"][getLanguage()]}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 2 })}>{this.langTextMap["TRAFFIC INCIDENT"][getLanguage()]}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 3 })}>{this.langTextMap["PUBLIC DISTURBANCE"][getLanguage()]}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 4 })}>{this.langTextMap["BIO HAZARD"][getLanguage()]}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 5 })}> {this.langTextMap["METEOR"][getLanguage()]} </Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 6 })}> {this.langTextMap["STORM"][getLanguage()]}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => this.setState({ type: 7 })}>{this.langTextMap["OTHER"][getLanguage()]}</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

    </>
  }

  scaleDropDown() {
    return <>
      <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">

          {this.langTextMap["Select Scale"][getLanguage()]}
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
