import React, { Component } from "react";
import "./ReportDisasterPopUp.css";
import { Modal, Button, Dropdown } from "react-bootstrap";
import cookies from 'js-cookie'
import langTextMap from "./popupTranslation"
import { urlVar } from '../../url_confg'


export function getLanguage() {
  const currentLanguageCode = cookies.get('i18next')
  return currentLanguageCode
}

export function disasterRadius(parent) {

  return <>
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle id="dropdown-autoclose-true">

        {langTextMap["Disaster Radius"][getLanguage()]}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 0 })}>0m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 100 })}>100m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 200 })}>200m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 300 })}>300m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 400 })}>400m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 500 })}>500m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 600 })}>600m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 700 })}>700m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 800 })}>800m</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ radius: 900 })}>900m</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>
}

export function disasterTypeDropDown(parent) {
  return <>
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle id="dropdown-autoclose-true">

        {langTextMap["Disaster Type"][getLanguage()]}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 0 })}>{langTextMap["FIRE"][getLanguage()]}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 1 })}>{langTextMap["FLOOD"][getLanguage()]}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 2 })}>{langTextMap["TRAFFIC INCIDENT"][getLanguage()]}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 3 })}>{langTextMap["PUBLIC DISTURBANCE"][getLanguage()]}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 4 })}>{langTextMap["BIO HAZARD"][getLanguage()]}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 5 })}> {langTextMap["METEOR"][getLanguage()]} </Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 6 })}> {langTextMap["STORM"][getLanguage()]}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => parent.setState({ type: 7 })}>{langTextMap["OTHER"][getLanguage()]}</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>

  </>
}

export function scaleDropDown(parent) {
  return <>
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle id="dropdown-autoclose-true">

        {langTextMap["Select Scale"][getLanguage()]}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => parent.setState({ scale: 1 })}>1</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 2 })}>2</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 3 })}>3</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 4 })}>4</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 5 })}>5</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 6 })}>6</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 7 })}>7</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 8 })}>8</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 9 })}>9</Dropdown.Item>
        <Dropdown.Item onClick={() => parent.setState({ scale: 10 })}>10</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>
}

class ReportDisasterPopUp extends Component {
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
      let disasterLocationJSON = await fetch(urlVar + "/api/1/disasters-civ/", requestOptions).then(response => response.json());

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
              <h1>{langTextMap["Disaster Report"][getLanguage()]} </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{langTextMap["Would you like to report a disaster at this location?"][getLanguage()]}  </h3>
            <div>{langTextMap["Longitude"][getLanguage()]} {this.props.position.lng.toFixed(3)} {langTextMap["Latitude"][getLanguage()]} {this.props.position.lat.toFixed(3)}</div>
            {scaleDropDown(this)}
            {disasterTypeDropDown(this)}
            {disasterRadius(this)}

          </Modal.Body>
          <Modal.Footer>
            <Button aria-label="Confirm" variant="primary" onClick={() => this.confirmButtonClick()}>
              {langTextMap["Confirm"][getLanguage()]}
            </Button>
          </Modal.Footer>
        </Modal >
      </div >
    );
  }


}

export default ReportDisasterPopUp;
