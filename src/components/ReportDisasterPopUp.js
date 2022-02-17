import React, { Component } from "react";
import "./ReportDisasterPopUp.css";
import { Modal ,Button, ButtonGroup, ButtonToolbar, Dropdown} from "react-bootstrap";


class ReportDisasterPopUp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      type: -1,
      scale: -1
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      this.setState(()=>({
        type: -1,
        scale: -1
      }))
    }
  }

  confirmButtonClick(event) {
    
    if(this.state.scale!==-1 && this.state.type!==-1){
      this.postDisasterLocation();
    }else{
      alert("Please select disaster scale and type")
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
    <Dropdown className="d-inline mx-2">
    <Dropdown.Toggle id="dropdown-autoclose-true">
      Disaster Type
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#" onClick={() => this.setState({type: 1})}>FIRE</Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => this.setState({type: 2})}>FLOOD</Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => this.setState({type: 3})}>TRAFFIC INCIDENT</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

    </>
  }

  scaleButtonToolBar() {
    return <>
    
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle id="dropdown-autoclose-true">
        Select Scale
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={ () => this.setState({scale: 1})}>1</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 2})}>2</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 3})}>3</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 4})}>4</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 5})}>5</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 6})}>6</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 6})}>6</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 7})}>7</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 8})}>8</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 9})}>9</Dropdown.Item>
        <Dropdown.Item onClick={ () => this.setState({scale: 10})}>10</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  }
}

export default ReportDisasterPopUp;
