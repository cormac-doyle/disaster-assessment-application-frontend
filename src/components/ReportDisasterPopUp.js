import React from 'react';
import { Popup } from 'react-leaflet';
import './ReportDisasterPopUp.css';

function ReportDisasterPopUp(props) {
  
    
        return (props.trigger) ? (
            <div className="popup">
              <div className="popup-inner">
                  <button className = "close-btn">close</button>
                  {props.children}
              </div>
            </div>
          ) : null
    
}

export default ReportDisasterPopUp;
