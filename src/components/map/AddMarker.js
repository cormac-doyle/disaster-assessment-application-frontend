import React, { useState } from "react";
import {
  Marker,
  Popup,
  useMapEvents,
  Circle
} from "react-leaflet";
import ReportDisasterPopUp from "../report/ReportDisasterPopUp";

// const icon = L.icon({
//     iconSize: [25, 41],
//     iconAnchor: [10, 41],
//     popupAnchor: [2, -40],
//     iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
//     shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
// });
/*
function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>There you are...</Popup>
        </Marker>
    )
}
*/
export function AddMarker() {
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


