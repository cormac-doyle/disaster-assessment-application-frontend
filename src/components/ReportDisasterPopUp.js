import React , {Component} from 'react';
import './ReportDisasterPopUp.css';

class ReportDisasterPopUp extends Component {
  constructor(props){
    super(props)
    this.state={
      latitude:0,
      longitude:0,
    }
  }

  confirmButtonClick(event){
    this.props.setReportDisasterPopup(false)
    this.postDisasterLocation()
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
            longitude: 0,
            latitude: 0,
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
