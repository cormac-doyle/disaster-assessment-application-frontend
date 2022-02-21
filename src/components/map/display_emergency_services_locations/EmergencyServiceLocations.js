import React, { Component } from 'react'
import {
  Marker,
  Popup
} from "react-leaflet";
import { fetchResponseJson } from '../../fetchResponseJson'


export default class EmergencyServiceLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
        markers: [],
    }
}

componentDidMount() {
    return fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/emergency_services').then((responseJson) => {
        
        this.setState({
            markers: responseJson
            
        })
        console.log(this.state.markers[0])
    })
}

  render() {
    if(this.state.markers.length>0){
      return (
      <>
        {this.state.markers.map((location, idx) => 
          <Marker key={`marker-${idx}`} position={[location.lat, location.long]}>
            <Popup>{location.name}</Popup>
          </Marker>
        )}
      </>
        
        
       )
    }else{
      return null
    }
    
  }
}
