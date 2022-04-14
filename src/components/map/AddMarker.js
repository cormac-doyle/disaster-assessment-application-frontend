import React, { useState } from "react";
import {
  Marker,
  Popup,
  useMapEvents,
  Circle
} from "react-leaflet";
import ReportDisasterPopUp from "../report/ReportDisasterPopUp";

//add a location marker on click for reporting disaster
export function AddMarker(props) {
  const [position, setPosition] = useState(null);
  const [reportDisasterPopup, setReportDisasterPopup] = useState(false);

  useMapEvents({
    click: (e) => {
      setReportDisasterPopup(true);
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <>


      <ReportDisasterPopUp
        show={reportDisasterPopup}
        onHide={setReportDisasterPopup}
        position={position}

      >
        <h1>Report Disaster At this Location?</h1>
      </ReportDisasterPopUp>

      <Circle center={position} radius={0}>
        <Marker position={position}>
          <Popup>Disaster Location</Popup>
        </Marker>
      </Circle>
    </>
  );
}


