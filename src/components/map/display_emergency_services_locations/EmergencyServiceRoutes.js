import React, { Component } from 'react'
import RoutingMachine from '../RoutingMachine';
import RoutingMachineNew from '../RoutingMachineNew';

import L from "leaflet";
import { fetchResponseJson } from '../../fetchResponseJson';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker'
import { urlVar } from '../../../url_confg'


//icons for emergency services routing
const BusIcon = L.icon({
    iconUrl: require("../../ESTypes/images/bus.png"),
    iconSize: [50, 50],
});

const BusIconFlipped = L.icon({
    iconUrl: require("../../ESTypes/images/busFlipped.png"),
    iconSize: [50, 50],
});

const FireTruckIcon = L.icon({
    iconUrl: require("../../ESTypes/images/fireTruckIcon.png"),
    iconSize: [45, 45],
});
const FireTruckIconFlipped = L.icon({
    iconUrl: require("../../ESTypes/images/fireTruckIconFlipped.png"),
    iconSize: [45, 45],
});

const PoliceCarIcon = L.icon({
    iconUrl: require("../../ESTypes/images/policeCarIcon.png"),
    iconSize: [50, 50],
});
const PoliceCarIconFlipped = L.icon({
    iconUrl: require("../../ESTypes/images/policeCarIconFlipped.png"),
    iconSize: [50, 50],
});
const AmbulanceIcon = L.icon({
    iconUrl: require("../../ESTypes/images/abulanceIcon.png"),
    iconSize: [50, 50],
});
const AmbulanceIconFlipped = L.icon({
    iconUrl: require("../../ESTypes/images/ambulanceIconFlipped.png"),
    iconSize: [50, 50],
});
const ArmyTankIcon = L.icon({
    iconUrl: require("../../ESTypes/images/armyTankIcon.png"),
    iconSize: [50, 50],
});
const ArmyTankIconFlipped = L.icon({
    iconUrl: require("../../ESTypes/images/armyTankIconFlipped.png"),
    iconSize: [50, 50],
});

//different colours for different emergency services
export default class EmergencyServiceRoutes extends Component {
    colorMap = {
        "police": "#2509b3",
        "fire_brigade": "#ff5900",
        "army": "#0d6100",
        "ambulance": "#f54242",
        "transport_services": "#e9ed07"

    }
    //set speed for emergency services vehicles
    vehicleSpeed = 300

    constructor(props) {
        super(props);
        this.state = {
            emergency_services: [],

            fire_brigade_coords: [],
            fire_brigade_index: 1,
            fire_brigade_animation: true,

            police_coords: [],
            police_index: 1,
            police_animation: true,

            ambulance_coords: [],
            ambulance_index: 1,
            ambulance_animation: true,

            army_coords: [],
            army_index: 1,
            army_animation: true,

            transport_services_coords: [],
            transport_services_index: 1,
            transport_services_animation: true

        }
    }

    //get nearest emergency services
    componentDidMount() {
        return fetchResponseJson(urlVar + '/api/1/get_nearest_services').then((responseJson) => {

            this.setState({
                emergency_services: responseJson

            }
            )
            console.log("ES routes: " + JSON.stringify(this.state.emergency_services))
        })
    }

    handleTime = (time) => {
        console.log("Received time")
    }
    //set up animation of emergency services vehicles
    handleAnimation = (coords, emergencyServiceType) => {
        if (emergencyServiceType === "transport_services") {
            var coordsRevered = coords.slice().reverse()
            coordsRevered.push(coords[0])
            coordsRevered.push(coords[0])
            coordsRevered.push(coords[0])
            coordsRevered.push(coords[0])

            coords = coordsRevered.concat(coords)
        } else {
            coords.reverse()

        }

        var emergencyServiceTypeIndex = emergencyServiceType + "_index"
        var emergencyServiceTypeCoords = emergencyServiceType + "_coords"
        var emergencyServiceTypeAnimationStatus = emergencyServiceType + "_animation"


        this.setState(
            {
                [emergencyServiceTypeCoords]: coords,
            })
        console.log("Animating: " + emergencyServiceType)
        console.log("Received Route Coords: " + this.state[emergencyServiceTypeCoords])
        for (let index = 0; index < this.state[emergencyServiceTypeCoords].length; index++) {
            setTimeout(() => {
                if (this.state[emergencyServiceTypeIndex] === this.state[emergencyServiceTypeCoords].length - 1) {
                    this.setState({ [emergencyServiceTypeCoords]: [] })
                    this.setState({ [emergencyServiceTypeIndex]: 1 })
                    this.setState({ [emergencyServiceTypeAnimationStatus]: false })
                } else {
                    this.setState(prevState => {
                        return {
                            [emergencyServiceTypeIndex]: prevState[emergencyServiceTypeIndex] + 1,
                        }
                    });
                }
            }, this.vehicleSpeed * (index + 1));
        }
    }

    //render the routing on the map
    render() {

        if (this.state.emergency_services[this.props.disaster.id]) {
            return (
                <>
                    {this.routeESAnim("fire_brigade", this.props.disaster)}
                    {this.routeESAnim("police", this.props.disaster)}
                    {this.routeESAnim("ambulance", this.props.disaster)}
                    {this.routeESAnim("transport_services", this.props.disaster)}
                    {this.routeESAnim("army", this.props.disaster)}


                    {this.showESAnimations(this.props.disaster.already_addressed)}

                </>
            )
        } else {
            return null;
        }
    }
    showESroutes() {

    }

    //animations for emergency service vehicles
    showESAnimations(alreadyAdressed) {
        if (alreadyAdressed === false) {
            return <>
                {this.animateIcon(FireTruckIcon, FireTruckIconFlipped, this.state.fire_brigade_coords, this.state.fire_brigade_index, this.vehicleSpeed)}
                {this.animateIcon(AmbulanceIcon, AmbulanceIconFlipped, this.state.ambulance_coords, this.state.ambulance_index, this.vehicleSpeed)}
                {this.animateIcon(PoliceCarIcon, PoliceCarIconFlipped, this.state.police_coords, this.state.police_index, this.vehicleSpeed)}
                {this.animateIcon(ArmyTankIcon, ArmyTankIconFlipped, this.state.army_coords, this.state.army_index, this.vehicleSpeed)}
                {this.animateIcon(BusIcon, BusIconFlipped, this.state.transport_services_coords, this.state.transport_services_index, this.vehicleSpeed)}
            </>

        }
    }

    //animation of individual icons
    animateIcon(icon, flippedIcon, polyline, index, speed) {
        if (polyline.length > 0) {
            var animateIcon = icon
            if (polyline[index - 1].lng > polyline[index].lng) {
                animateIcon = flippedIcon
            }
            return <LeafletTrackingMarker
                icon={animateIcon}
                position={[polyline[index].lat, polyline[index].lng]}
                previousPosition={[polyline[index - 1].lat, polyline[index - 1].lng]}
                duration={speed} />
        }
    }


    //routing for emergency services
    routeESAnim(esType, disaster) {
        var routingMachine

        if (this.state.emergency_services[disaster.id][esType].length > 0) {
            if (this.props.disaster.already_addressed === true || this.state[esType + "_animation"] === false) {


                return <RoutingMachineNew
                    lineColor={this.colorMap[esType]}
                    routeTravelMode={"walking"}
                    animationClassName={""}
                    lineWeight={5}

                    waypoints={[
                        L.latLng(disaster.lat, disaster.long),
                        L.latLng(this.state.emergency_services[this.props.disaster.id][esType][0].lat, this.state.emergency_services[this.props.disaster.id][esType][0].long),
                    ]} />
            }

            else {

                return <RoutingMachine
                    lineColor={this.colorMap[esType]}
                    routeTravelMode={"walking"}
                    animationClassName={esType}
                    lineWeight={10}

                    getRouteCoords={esType}
                    handleCoords={this.handleAnimation}
                    waypoints={[
                        L.latLng(disaster.lat, disaster.long),
                        L.latLng(this.state.emergency_services[disaster.id][esType][0].lat, this.state.emergency_services[disaster.id][esType][0].long),
                    ]} />

            }
        }


        return routingMachine

    }
}
