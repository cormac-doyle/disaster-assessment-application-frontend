import React from 'react'
import { MapContainer, TileLayer, } from "react-leaflet";
import { render } from 'react-dom'
import HelloWorldExample from './HelloWorldExample'

function App() {
  return (
    <HelloWorldExample />
  )
}

function Map() {
  const position = [51.505, -0.09]

  render(
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )

}
Map();
export default App;
