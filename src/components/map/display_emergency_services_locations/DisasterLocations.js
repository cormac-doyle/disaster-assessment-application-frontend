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
import getDisaster from '../../DisasterTypes/DisasterWrapper';
import { getDistance, isPointWithinRadius, getRhumbLineBearing, computeDestinationPoint } from 'geolib';

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

    componentDidUpdate(prevProps) {
        if (prevProps.userLocation !== this.props.userLocation) {
            this.setState({
                evacPoints: [],
                minDistFound: false,
                minDistance: 99999999,
                minDistanceIndex: null
            })


            this.state.disasters.map((disaster, idx) =>
                this.getEvacRoutes(disaster)
            )

        }
    }

    componentDidMount() {
        fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/disasters').then((responseJson) => {

            this.setState({
                disasters: responseJson
            })
            console.log("Disasters: " + JSON.stringify(this.state.disasters))

            // this.state.disasters.map((disaster, idx) =>
            //     this.getEvacRoutes(disaster)
            // )
        })


    }

    handleDistance = (distance, index) => {
        if (distance < this.state.minDistance) {
            this.setState({ minDistance: distance });
            this.setState({ minDistanceIndex: index });
        }
        if (index === this.state.evacPoints.length - 1) {
            console.log("Minimum Dist: " + this.state.minDistance)
            this.setState({ minDistFound: true })
        }
    }

    render() {

        if (this.state.disasters.length > 0) {
            return (
                <>
                    {this.state.disasters.map((disaster, idx) =>

                        <>
                            {this.displayDisaster(idx, disaster)}
                            
                        </>
                    )}
                    
                </>
            )
        } else {
            return null
        }
    }
    
    displayDisaster(idx, disaster) {

        if(disaster.verified===false){
            return <>
                <Circle
                    key={`marker-${idx}`}
                    center={[disaster.lat, disaster.long]}
                    radius={0}
                    color={getDisaster(disaster.disaster_type).colour}>
                    <Marker key={`marker-${idx}`} position={[disaster.lat, disaster.long]} icon={getDisaster(disaster.disaster_type).icon}>
                        <Popup>{"This " + getDisaster(disaster.disaster_type).name + " disaster has not been verified yet"}</Popup>
                    </Marker>
                </Circle>;
                <EmergencyServiceRoutes disaster={disaster}></EmergencyServiceRoutes>
            </>
        }

        if(disaster.verified===true && disaster.completed===false){
            return <>
                <Circle
                    key={`marker-${idx}`}
                    center={[disaster.lat, disaster.long]}
                    radius={disaster.radius}
                    color={getDisaster(disaster.disaster_type).colour}>
                    <Marker key={`marker-${idx}`} position={[disaster.lat, disaster.long]} icon={getDisaster(disaster.disaster_type).icon}>
                        <Popup>{getDisaster(disaster.disaster_type).name}</Popup>
                    </Marker>
                </Circle>;
                <EmergencyServiceRoutes disaster={disaster}></EmergencyServiceRoutes>
                {this.displayEvacRoute()}
            </>
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
                    waypoints={[
                        L.latLng(this.props.userLocation[0], this.props.userLocation[1]),
                        L.latLng(evacPoint.latitude, evacPoint.longitude),
                    ]}
                    lineWeight={0.01}
                    routeTravelMode={"walking"}
                />
            )}</>
        } else {
            return <>
                <RoutingMachine
                    lineColor="#0095ff"
                    waypoints={[
                        L.latLng(this.state.evacPoints[this.state.minDistanceIndex].latitude, this.state.evacPoints[this.state.minDistanceIndex].longitude),
                        L.latLng(this.props.userLocation[0], this.props.userLocation[1]),
                    ]}
                    routeTravelMode={"walking"}
                    animationClassName={"evacuation"}
                />
            </>
        }
    }

    getEvacRoutes(disaster) {
        if (this.props.userLocation) {
            let distanceToDisaster = getDistance(
                { latitude: this.props.userLocation[0], longitude: this.props.userLocation[1] },
                { latitude: disaster.lat, longitude: disaster.long }
            )
            // console.log("user distance to disaster: "+ distanceToDisaster)
            // console.log("disaster radius: "+ disaster.radius)

            if (isPointWithinRadius(
                { latitude: this.props.userLocation[0], longitude: this.props.userLocation[1] },
                { latitude: disaster.lat, longitude: disaster.long },
                disaster.radius
            )) {
                this.setEvacPoints(disaster.lat, disaster.long, disaster.radius, this.props.userLocation[0], this.props.userLocation[1], distanceToDisaster)
            } else {
                return null;
            }
        } else {
            return null;
        }

    }



    setEvacPoints(disasterLat, disasterLong, disasterRadius, userLat, userLong, distanceToDisaster) {
        let evacPoints = []

        let bearing = getRhumbLineBearing(
            { latitude: disasterLat, longitude: disasterLong },
            { latitude: userLat, longitude: userLong }
        );

        for (let i = 0; i < 20; i++) {
            let evacPoint = computeDestinationPoint(
                { latitude: disasterLat, longitude: disasterLong },
                disasterRadius,
                (bearing + (i * 2.5 - 25)));
            evacPoints.push(evacPoint);
        }

        this.setState({
            evacPoints: evacPoints
        })
    }
}
