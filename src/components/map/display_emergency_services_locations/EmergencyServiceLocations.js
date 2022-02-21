import React, { Component } from 'react'

import {
  Marker,
  Popup
} from "react-leaflet";

export default class EmergencyServiceLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
        locations: [],
    }
}

  render() {
    return (
        <Marker position={[53.348, -6.2603]}>
            <Popup>ES Location</Popup>
        </Marker>
    )
  }
}
