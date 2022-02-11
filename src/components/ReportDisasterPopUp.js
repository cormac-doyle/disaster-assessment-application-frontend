import React, { Component } from "react";
import ReactSlider from "react-slider";
import "./ReportDisasterPopUp.css";
import Step from "./Slider.js";
import { Modal ,Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";


function MyVerticallyCenteredModal(props){
    <Modal  
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered= {true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Disaster Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Would you like to report a disaster at this location</h2>
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
        </Modal.Body>
      <Modal.Footer>

        <Button variant="primary" onClick={() => this.confirmButtonClick()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
}

class ReportDisasterPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  confirmButtonClick(event) {
    this.postDisasterLocation();
    this.props.onHide();
  }
  
  async postDisasterLocation() {
    try {
      let disasterLocationJSON = await fetch(
        "http://localhost:8000/disasters",
        {
          method: "post",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            user_id: 123,
            disaster_id: 999,
            scale: 10,
            disaster_type: "FIRE",
            disaster_location: {
              long: this.props.position.lng,
              lat: this.props.position.lat,
            },
          }),
        }
      );

      //alert(disasterLocationJSON)
      console.log(JSON.stringify(disasterLocationJSON));
    } catch (e) {
      console.log(this.props.position.lng);
      console.log(this.props.position.lat);
      alert("posting data failed");
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
        <h4>Type:</h4>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <Button>FIRE</Button>
            <Button>FLOOD</Button>
            <Button>TRAFFIC INCIDENT</Button>
          </ButtonGroup>
        </ButtonToolbar>

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

  // render() {
  //   return this.props.trigger ? (
  //     <div className="popup">
  //       <div className="popup-inner">
  //         <button
  //           className="close-btn"
  //           onClick={() => this.props.setReportDisasterPopup(false)}
  //         >
  //           close
  //         </button>
  //         {this.props.children}
  //         {"Disaster Scale:"}
  //         <ReactSlider
  //           className="horizontal-slider"
  //           thumbClassName="example-thumb"
  //           trackClassName="example-track"
  //           renderThumb={(props, state) => (
  //             <div {...props}>{state.valueNow}</div>
  //           )}
  //         />
  //         <button
  //           className="confirm-btn"
  //           onClick={() => this.confirmButtonClick()}
  //         >
  //           confirm
  //         </button>
  //       </div>
  //     </div>
  //   ) : null;
  // }
}

export default ReportDisasterPopUp;
