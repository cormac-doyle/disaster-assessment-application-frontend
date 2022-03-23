import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import L from 'leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import EmergencyServiceLocations from './display_emergency_services_locations/EmergencyServiceLocations';
import DisasterLocations from './display_emergency_services_locations/DisasterLocations';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

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


const Map = () => {

    const defaultPosition = [53.348, -6.2603];  // Dublin City Centre

    return (<div className="map__container">

        <MapContainer
            center={defaultPosition}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: "90vh" }}
            zoomControl={false}
        >

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={`https://api.mapbox.com/styles/v1/tmulligan98/cl10nl2lw000016pv06fsbn7l/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidG11bGxpZ2FuOTgiLCJhIjoiY2wxMGx3NXlhMDBzeTNqcGhnbWltZXJ3dCJ9.nEDNjEBlRNN_vKfTUpO9uQ`}
            />
            <DisasterLocations />
            <EmergencyServiceLocations />

        </MapContainer>

    </div>);
};
export default (Map);
