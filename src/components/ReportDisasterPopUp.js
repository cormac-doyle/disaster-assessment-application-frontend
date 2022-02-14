import React, { Component } from "react";
import ReactSlider from "react-slider";
import "./ReportDisasterPopUp.css";
import { Modal ,Button, ButtonGroup, ButtonToolbar, Spinner} from "react-bootstrap";


class ReportDisasterPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  confirmButtonClick(event) {
    this.postDisasterLocation();
  }
  
  async postDisasterLocation() {

    const requestOptions = {
      method: "post",
      //mode: 'no-cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: 0,
        disaster_id: 99,
        scale: 10,
        disaster_type: 1,
        long: this.props.position.lng,
        lat: this.props.position.lat,
      }),
    };

    try {
      
      let disasterLocationJSON = await fetch("https://ase-backend-2.herokuapp.com/api/1/disasters/", requestOptions).then(response => response.json());

      alert("Disaster Reported: " + JSON.stringify(disasterLocationJSON));
      this.props.onHide();
      
    } catch (e) {
      alert("Report Disaster Failed");
      
      this.props.onHide();
      console.log(e);
    }
  }

  render(){
    return (
      <div>
        <Modal  
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered= {true}
    >
      <Modal.Header closeButton>
        <Modal.Title><h1>Disaster Report</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Would you like to report a disaster at this location?  </h3>
        <div>Longitude:{this.props.position.lng.toFixed(3)} Latitude: {this.props.position.lat.toFixed(3)}</div>
        {this.scaleButtonToolBar()}
        {this.disasterTypeButtonToolBar()}
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

  disasterTypeButtonToolBar() {
    return <>
    <h4>Type:</h4>
    <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-2" aria-label="First group">
        <Button>FIRE</Button>
        <Button>FLOOD</Button>
        <Button>TRAFFIC INCIDENT</Button>
      </ButtonGroup>
    </ButtonToolbar>
    </>
  }

  scaleButtonToolBar() {
    return <>
    <h4>Scale:</h4>
    <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-2" aria-label="First group">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button>10</Button>
      </ButtonGroup>
    </ButtonToolbar>
    </>
    
  }
}

export default ReportDisasterPopUp;
