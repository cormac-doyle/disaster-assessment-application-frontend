import React, { Component } from 'react'
import {
    Circle,
    Marker,
    Popup
} from "react-leaflet";
import { fetchResponseJson } from '../../fetchResponseJson'
import L from "leaflet";
import RoutingMachine from ".././RoutingMachine";
import EmergencyServiceRoutes from './EmergencyServiceRoutes';


const FloodIcon = L.icon({
    iconUrl: require("./images/flood.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const FireIcon = L.icon({
    iconUrl: require("./images/fire.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const TrafficIcon = L.icon({
    iconUrl: require("./images/crash.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [2, -40],
});

const BioHazardIcon = L.icon({
    iconUrl: require("./images/biohazard.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const MeteorIcon = L.icon({
    iconUrl: require("./images/meteor.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const StormIcon = L.icon({
    iconUrl: require("./images/storm.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const AlertIcon = L.icon({
    iconUrl: require("./images/alert.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [2, -40],
});
const DisturbanceIcon = L.icon({
    iconUrl: require("./images/disturbance.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
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

    getDisasterIcon(id) {
        switch (id) {
            case 0:
                return FireIcon
            case 1:
                return FloodIcon
            case 2:
                return TrafficIcon
            case 3:
                return DisturbanceIcon
            case 4:
                return BioHazardIcon
            case 5:
                return MeteorIcon
            case 6:
                return StormIcon
            case 7:
                return AlertIcon
        }
    }

    getDisasterName(type) {
        switch (type) {
            case 0:
                return "Fire"
            case 1:
                return "Flood"
            case 2:
                return "Traffic Incident"
            case 3:
                return "Public Disturbance"
            case 4:
                return "Bio Hazard"
            case 5:
                return "Meteor"
            case 6:
                return "Storm"
            case 7:
                return "Other"
        }
    }

    getDisasterColor(type) {
        switch (type) {
            case 0:
                return "red"
            case 1:
                return "blue"
            case 2:
                return "grey"
            case 3:
                return "grey"
            case 4:
                return "yellow"
            case 5:
                return "orange"
            case 6:
                return "blue"
            case 7:
                return "grey"
        }
    }

    render() {
        if (this.state.disasters.length > 0) {
            return (
                <>
                    {this.state.disasters.map((disaster, idx) =>
                        <>
                            <Circle
                                key={`marker-${idx}`}
                                center={[disaster.lat, disaster.long]}
                                radius={disaster.radius}
                                color={this.getDisasterColor(disaster.disaster_type)}>
                                <Marker key={`marker-${idx}`} position={[disaster.lat, disaster.long]} icon={this.getDisasterIcon(disaster.disaster_type)}>
                                    <Popup>{this.getDisasterName(disaster.disaster_type)}</Popup>
                                </Marker>
                            </Circle>
                            {this.displayEvacRoutes(disaster)}
                            <EmergencyServiceRoutes disaster={disaster}></EmergencyServiceRoutes>
                        </>
                    )}
                </>
            )
        } else {
            return null
        }

    }

    displayEvacRoutes(disaster) {
        return <RoutingMachine waypoints={[
            L.latLng(disaster.lat, disaster.long),
            L.latLng(disaster.lat + disaster.radius / 111111, disaster.long),
        ]} />;
    }
}
