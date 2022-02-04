import React from 'react';
import './ReportDisasterPopUp.css';

function ReportDisasterPopUp(props) {

        return (props.trigger) ? (
            <div className="popup">
              <div className="popup-inner">
                  <button className = "close-btn" onClick={()=>props.setReportDisasterPopup(false)}>close</button>
                  {props.children}
                  <button className = "confirm-btn" onClick={
                    ()=>props.setReportDisasterPopup(false)
                    //send gps coordinates here
                    
                    }>confirm</button>
              </div>
            </div>
          ) : null
}

export default ReportDisasterPopUp;
