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

const Map = (props) => {
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
          //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.mapbox.com/styles/v1/tmulligan98/cl10nl2lw000016pv06fsbn7l/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidG11bGxpZ2FuOTgiLCJhIjoiY2wxMGx3NXlhMDBzeTNqcGhnbWltZXJ3dCJ9.nEDNjEBlRNN_vKfTUpO9uQ"
        />
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?tileSize=256&key=XUUhWmJAmCIxeKWiGD31ra6ftKxwAAwD"
        />
        <AddMarker />

      </MapContainer>
    </div>
  );
};
export default Map;
