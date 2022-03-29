import {React, useState} from 'react'
import { MapContainer, TileLayer, Marker,Popup,useMapEvents} from "react-leaflet";
import L from 'leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import EmergencyServiceLocations from './display_emergency_services_locations/EmergencyServiceLocations';
import DisasterLocations from './display_emergency_services_locations/DisasterLocations';
import { LatLng } from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(){
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })
    //position = latLng()
    console.log("position: " + position)
    //position = LatLng(53,-6)
    if(position!=null){
        console.log("position set")
        return(
            <>
                <Marker position={[position.lat, position.lng]}>
                    <Popup>There you are...</Popup>
                </Marker>
                <DisasterLocations userLocation = {[position.lat, position.lng]}/>
            </>
        )
    }else{
        return(
            <>
                <DisasterLocations />
            </>
        )
    }
    
    
}



const Map = () => {

    const defaultPosition = [53.348, -6.2603];  // Dublin City Centre

    return (<div className="map__container">

        <MapContainer
            center={defaultPosition}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "90vh" }}
            zoomControl={false}
        >

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <EmergencyServiceLocations />
          
        </MapContainer>

    </div>);
};
export default (Map);
