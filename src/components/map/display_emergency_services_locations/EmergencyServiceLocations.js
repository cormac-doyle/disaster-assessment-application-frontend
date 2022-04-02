import React, { Component } from 'react'
import {
  Marker,
  Popup
} from "react-leaflet";
import { fetchResponseJson } from '../../fetchResponseJson'
import L from "leaflet";
import {LeafletTrackingMarker} from 'react-leaflet-tracking-marker'



const HospitalIcon = L.icon({
  iconUrl: require("./images/hospital.png"),
  iconSize: [40, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const PoliceIcon = L.icon({
  iconUrl: require("./images/policeIcon.png"),
  iconSize: [40, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const PoliceCarIcon = L.icon({
  iconUrl: require("./images/policeCarIcon.png"),
  iconSize: [60, 60],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const carPath = [
  {
    lat: 53.358, 
    lng: -6.2603
  },
  {
    lat: 53.353, 
    lng: -6.2603
  },
  {
    lat: 53.350, 
    lng: -6.265
  },
  {
    lat: 53.358, 
    lng: -6.261
  }
  
];

const FirestationIcon = L.icon({
  iconUrl: require("./images/firestation.png"),
  iconSize: [40, 40],
  
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
    
      for (let index = 0; index < carPath.length-1; index++) {
        setTimeout(() => {
          
          if(this.state.carPosIndex===carPath.length-1){
            this.setState(prevState => {
              return{
                carPosPrevIndex: prevState.carPosIndex,
                carPosIndex: 0,
              }
            })
          }
          else{
            this.setState(prevState=>{
              return{
                carPosPrevIndex: prevState.carPosIndex,
                carPosIndex: prevState.carPosIndex + 1,
              }
            });
          }
        }, 2000  * (index+1));
      }  
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
          <LeafletTrackingMarker icon={PoliceCarIcon} position={carPath[this.state.carPosIndex]} previousPosition={carPath[this.state.carPosIndex-1]} duration={2000} />

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
