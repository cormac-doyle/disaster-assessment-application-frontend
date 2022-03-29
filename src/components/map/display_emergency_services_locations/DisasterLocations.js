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
import { getDistance, isPointWithinRadius, getRhumbLineBearing, computeDestinationPoint } from 'geolib';


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
            minDistance: 99999999,
            minDistanceIndex: null,
            evacPoints: [],
            minDistFound: false
        }
    }

    componentDidUpdate() {
       

    }

    componentDidMount() {
        
        fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/disasters').then((responseJson) => {

            this.setState({
                disasters: responseJson
            })
            console.log("Disasters: "+JSON.stringify(this.state.disasters))

            this.state.disasters.map((disaster, idx) =>
                this.getEvacRoutes(disaster)
            )
        })
        
    }

    handleDistance = (distance,index) => {
        if(distance<this.state.minDistance){
            this.setState({ minDistance: distance});
            this.setState({ minDistanceIndex: index});
        }
        if(index===this.state.evacPoints.length-1){
            console.log("min dist: "+this.state.minDistance)
            this.setState({minDistFound: true})
        }
    }

    getDisasterIcon(id) {
        if (id === 0) {
            return FireIcon
        }
        else if (id === 1) {
            return FloodIcon
        }
        else if (id === 2) {
            return TrafficIcon
        }
        else if (id === 3) {
            return DisturbanceIcon
        }
        else if (id === 4) {
            return BioHazardIcon
        }
        else if (id === 5) {
            return MeteorIcon
        }
        else if (id === 6) {
            return StormIcon
        }
        else if (id === 7) {
            return AlertIcon
        }
    }

    getDisasterName(type) {
        if (type === 0) {
            return "Fire"
        }
        if (type === 1) {
            return "Flood"
        }
        if (type === 2) {
            return "Traffic Incident"
        }
        if (type === 3) {
            return "Public Disturbance"
        }
        if (type === 4) {
            return "Bio Hazard"
        }
        if (type === 5) {
            return "Meteor"
        }
        if (type === 6) {
            return "Storm"
        }
        if (type === 7) {
            return "Other"
        }
    }
    getDisasterColor(type) {
        if (type === 0) {
            return "red"
        }
        if (type === 1) {
            return "blue"
        }
        if (type === 2) {
            return "grey"
        }
        if (type === 3) {
            return "grey"
        }
        if (type === 4) {
            return "yellow"
        }
        if (type === 5) {
            return "orange"
        }
        if (type === 6) {
            return "blue"
        }
        if (type === 7) {
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
                            
                            <EmergencyServiceRoutes disaster={disaster}></EmergencyServiceRoutes>
                        </>
                    )}

                    {this.displayEvacRoute()}
                    
                </>
            )
        } else {
            return null
        }
    }
    
    displayEvacRoute(){
        if(!this.state.minDistFound){
            return <>{this.state.evacPoints.map((evacPoint,idx) =>
                <RoutingMachine 
                    getDistance={true}
                    handleDistance={this.handleDistance}
                    index={idx}
                    key={`route-${idx}`}
                    waypoints = {[
                        L.latLng(this.props.userLocation[0], this.props.userLocation[1]),
                        L.latLng(evacPoint.latitude, evacPoint.longitude),
                    ]}
                    routeTravelMode={"walking"} 
                />
            )}</>
        }else{
            return <>
                <RoutingMachine 
                    
                    waypoints = {[
                        L.latLng(this.props.userLocation[0], this.props.userLocation[1]),
                        L.latLng(this.state.evacPoints[this.state.minDistanceIndex].latitude, this.state.evacPoints[this.state.minDistanceIndex].longitude),
                    ]}
                    routeTravelMode={"walking"} 
                />
            </>

        }
        
            
    }

    getEvacRoutes(disaster) {
        if(this.props.userLocation){
            let distanceToDisaster = getDistance(
                {latitude: this.props.userLocation[0],longitude: this.props.userLocation[1] },
                {latitude:disaster.lat, longitude: disaster.long}
            )
            // console.log("user distance to disaster: "+ distanceToDisaster)
            // console.log("disaster radius: "+ disaster.radius)

            if(isPointWithinRadius(
                {latitude: this.props.userLocation[0],longitude: this.props.userLocation[1] },
                    {latitude:disaster.lat, longitude: disaster.long},
                disaster.radius
            )){
                let evacPoints = this.getEvacuationPoints(disaster.lat, disaster.long, disaster.radius, this.props.userLocation[0], this.props.userLocation[1],distanceToDisaster)
                
                this.setState({
                    evacPoints : evacPoints
                })

            }else{
                return null;
            }
        } else{
            return null;
        }
        
    }


   
    getEvacuationPoints(disasterLat, disasterLong, disasterRadius, userLat, userLong, distanceToDisaster){
        let evacPoints = []

        let bearing = getRhumbLineBearing(
            { latitude: disasterLat, longitude: disasterLong },
            { latitude: userLat, longitude: userLong }
        );

        console.log("bearing: "+(bearing+10))
        console.log(typeof(bearing))
        for (let i = 0; i < 10; i++) {
            let evacPoint = computeDestinationPoint(
                { latitude: disasterLat, longitude: disasterLong },
                disasterRadius,
                (bearing+(i*5 - 25)));
            evacPoints.push(evacPoint);
        }
        
        return evacPoints
    }
}
