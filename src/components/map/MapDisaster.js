import React from "react";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { AddMarker } from "./AddMarker";

// For the marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
  const defaultPosition = [53.348, -6.2603]; // Dublin City Centre

  return (
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "80vh" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarker />
        
      </MapContainer>
    </div>
  );
};
export default Map;
