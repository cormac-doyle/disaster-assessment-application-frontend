import React, { Component } from 'react'
import {
    Circle,
  Marker,
  Popup
} from "react-leaflet";
import { fetchResponseJson } from '../../fetchResponseJson'
import L from "leaflet";

const FloodIcon = L.icon({
    iconUrl: require("./images/flood.png"),
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

const FireIcon = L.icon({
    iconUrl: require("./images/fire.png"),
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

const TrafficIcon = L.icon({
    iconUrl: require("./images/crash.png"),
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

const BioHazardIcon = L.icon({
    iconUrl: require("./images/biohazard.png"),
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

const MeteorIcon = L.icon({
    iconUrl: require("./images/meteor.png"),
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});


export default class DisasterLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
        disasters: [],
    }
}

componentDidMount() {
    return fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/disasters').then((responseJson) => {
        
        this.setState({
            disasters: responseJson
            
        })
        console.log(this.state.disasters[0])
    })
}

    getDisasterIcon(id){
    if (id === 0){
        return FireIcon
    }
    else if (id === 1){
        return FloodIcon
    }
    else if (id === 2){
        return TrafficIcon
    }
    }

    getDisasterName(type){
        if(type===0){
            return "Fire"
        }
        if(type===1){
            return "Flood"
        }
        if(type===2){
            return "Traffic Incident"
        }
    }
    getDisasterColor(type){
        if(type === 0){
            return "red"
        }
        if(type === 1){
            return "blue"
        }
        if(type === 2){
            return "grey"
        }
    }

  render() {
    if(this.state.disasters.length>0){
      return (
      <>
        {this.state.disasters.map((disaster, idx) => 
            <Circle 
                key={`marker-${idx}`} 
                center={[disaster.lat, disaster.long]}
                radius = {disaster.radius}
                color = {this.getDisasterColor(disaster.disaster_type)}>
                <Marker key={`marker-${idx}`} position={[disaster.lat, disaster.long]} icon={this.getDisasterIcon(disaster.disaster_type)}>
                    <Popup>{this.getDisasterName(disaster.disaster_type)}</Popup>
                </Marker>
            </Circle>
          
        )}
      </>
        
        
       )
    }else{
      return null
    }
    
  }
}
