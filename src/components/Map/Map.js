import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import "./Map.css";

import 'leaflet/dist/leaflet.css';

// For the marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
});


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

function AddMarker() {
    const [position, setPosition] = useState(null)
    useMapEvents({
        click: (e) => {
            setPosition(e.latlng);
        }
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>Added position</Popup>
        </Marker>
    )
}

const Map = () => {

    const defaultPosition = [53.348, -6.2603];  // Dublin City Centre

    return (<div className="map__container">
        <MapContainer
            center={defaultPosition}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100vh" }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <AddMarker />
        </MapContainer>
    </div>);
};
export default (Map);