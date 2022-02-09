import React, { Component } from "react";
import ReactSlider from "react-slider";
import "./ReportDisasterPopUp.css";
import Step from "./Slider.js";
class ReportDisasterPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  confirmButtonClick(event) {
    this.postDisasterLocation();
    this.props.setReportDisasterPopup(false);
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

  render() {
    return this.props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <button
            className="close-btn"
            onClick={() => this.props.setReportDisasterPopup(false)}
          >
            close
          </button>
          {this.props.children}
          {"Disaster Scale:"}
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
          />
          <button
            className="confirm-btn"
            onClick={() => this.confirmButtonClick()}
          >
            confirm
          </button>
        </div>
      </div>
    ) : null;
  }
}

export default ReportDisasterPopUp;
