import React , {Component} from 'react';
import './ReportDisasterPopUp.css';

class ReportDisasterPopUp extends Component {
  constructor(props){
    super(props)
    this.state={
      latitude:this.props.location.lat,
      longitude:this.props.location.lng,
    }
  }

  confirmButtonClick(event){
    this.postDisasterLocation()
    this.props.setReportDisasterPopup(false)

  }

  async postDisasterLocation(){
    try{
      let disasterLocationJSON = await fetch("http://localhost:8000/", {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept':'application/json',
          'Content-type':'application/json',
        },
        body: JSON.stringify(
          {
          disasterStatus: true,
          disasterLocation : {
            longitude: this.latitude,
            latitude: this.longitude,
          }
        })
      });

      //alert(disasterLocationJSON)
      console.log(JSON.stringify(disasterLocationJSON))
    }catch (e){
      alert('posting data failed')
      console.log(e)
    }
  }
  
  render(){
    return (this.props.trigger) ? (
        <div className="popup">
          <div className="popup-inner">
              <button className = "close-btn" onClick={()=>this.props.setReportDisasterPopup(false)}>close</button>
              {this.props.children}
              <button className = "confirm-btn" onClick={ ()=>this.confirmButtonClick()}>confirm</button>
          </div>
        </div>
      ) : null
  }
}

export default ReportDisasterPopUp;
