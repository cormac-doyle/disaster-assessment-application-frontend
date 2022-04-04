import React, { Component } from 'react'
import {
  Marker,
  Popup
} from "react-leaflet";
import { fetchResponseJson } from '../../fetchResponseJson'
import L from "leaflet";



const HospitalIcon = L.icon({
  iconUrl: require("./images/hospital.png"),
  iconSize: [50, 50],
  
  popupAnchor: [2, -40],
});

const PoliceIcon = L.icon({
  iconUrl: require("./images/policeIcon.png"),
  iconSize: [50, 50],
  
  popupAnchor: [2, -40],
});

const FirestationIcon = L.icon({
  iconUrl: require("./images/firestation.png"),
  iconSize: [50, 50],
  
  popupAnchor: [2, -40],
});



export default class EmergencyServiceLocations extends Component {
  count=0
  constructor(props) {
    super(props);
    fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/emergency_services').then((responseJson) => {

      this.setState({
        markers: responseJson

      })
      //console.log(this.state.markers[0])
    })
    this.state = {
      markers: [],
      carPosIndex:1,
      carPosPrevIndex: 0
    }
  }



  componentDidMount() {
    
      
    }

  get_icon(id) {
    if (id === 0) {
      return PoliceIcon
    }
    else if (id === 1) {
      return FirestationIcon
    }
    else if (id === 2) {
      return HospitalIcon
    }
  }

  render() {
    if (this.state.markers.length > 0) {
      return (
        <>

          {this.state.markers.map((location, idx) =>
            <>
              <Marker key={`marker-${idx}`} position={[location.lat, location.long]} icon={this.get_icon(location.type)} >
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
