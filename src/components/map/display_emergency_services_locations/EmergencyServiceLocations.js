import React, { Component } from 'react'
import {
  Marker,
  Popup
} from "react-leaflet";
import getES from '../../ESTypes/ESWrapper';
import { fetchResponseJson } from '../../fetchResponseJson'

export default class EmergencyServiceLocations extends Component {
  count = 0
  constructor(props) {
    super(props);
    fetchResponseJson('http://localhost:8000/api/1/emergency_services').then((responseJson) => {

      this.setState({
        markers: responseJson

      })
      //console.log(this.state.markers[0])
    })
    this.state = {
      markers: [],
      carPosIndex: 1,
      carPosPrevIndex: 0
    }
  }

  render() {
    if (this.state.markers.length > 0) {
      return (
        <>

          {this.state.markers.map((location, idx) =>
            <>
              <Marker key={`marker-${idx}`} position={[location.lat, location.long]} icon={getES(location.type).icon} >
                <Popup>{location.name}</Popup>
              </Marker>
            </>

          )}
        </>


      )
    } else {
      return null
    }

  }
}
