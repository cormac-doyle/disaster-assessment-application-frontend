import { React, useState, useCallback, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import EmergencyServiceLocations from './display_emergency_services_locations/EmergencyServiceLocations';
import DisasterLocations from './display_emergency_services_locations/DisasterLocations';
import TransportServiceLocations from './display_emergency_services_locations/TransportServiceLocations';

const LocationIcon = L.icon({
  iconUrl: require("./location.png"),
  iconSize: [50, 50],

  popupAnchor: [2, -40],
});

const center = {

  lat: 53.34196,
  lng: -6.25395,
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//draggable location marker for evacuation routing
function DraggableMarker() {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <>
      <Marker
        icon={LocationIcon}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Location is now draggable'
              : 'User Location. Click here to make location draggable'}
          </span>
        </Popup>
      </Marker>
      <DisasterLocations userLocation={[position.lat, position.lng]} />
    </>

  )
}

//map of Dublin displaying disasters, routing and real-time traffic data from OpenStreetMaps and TomTom
const Map = () => {

  const defaultPosition = center;  // Dublin City Centre

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
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?tileSize=256&key=XUUhWmJAmCIxeKWiGD31ra6ftKxwAAwD"
      />

      <DraggableMarker />
      <EmergencyServiceLocations />
      <TransportServiceLocations />

    </MapContainer>

  </div>);
};
export default (Map);
