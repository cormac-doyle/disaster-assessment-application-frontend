import React, { Component } from 'react'
import RoutingMachine from '../RoutingMachine';
import L from "leaflet";
import { fetchResponseJson } from '../../fetchResponseJson';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker'


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

export default class EmergencyServiceRoutes extends Component {
    colorMap={
        "police":"#2509b3",
        "fire_brigade":"#ff5900",
        "army":"#00960f",
        "ambulance":"#f54242",

    }
    vehicleSpeed = 100

    constructor(props) {
        super(props);
        this.state = {
            emergency_services: [],

            fire_brigade_coords: [],
            fire_brigade_index:1,
            fire_brigade_animation:true,
            
            police_coords: [],
            police_index:1,
            police_animation:true,
            
            ambulance_coords: [],
            ambulance_index:1,
            ambulance_animation:true,
            
            army_coords: [],
            army_index:1,
            army_animation:true,
            

        }
    }


    componentDidMount() {
        return fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/get_nearest_services').then((responseJson) => {

            this.setState({
                emergency_services: responseJson
            })
            console.log("ES routes: " + JSON.stringify(this.state.emergency_services))
        })
    }

    handleTime = (time) => {
        console.log("Received time")
    }
    handleAnimation = (coords, emergencyServiceType) => {
        coords.reverse()
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
            if(this.state[emergencyServiceTypeIndex]===this.state[emergencyServiceTypeCoords].length-1){
                this.setState({[emergencyServiceTypeCoords]:[]})
                this.setState({[emergencyServiceTypeIndex]:1})
                this.setState({[emergencyServiceTypeAnimationStatus]:false})
            }else{
                this.setState(prevState=>{
                    return{
                        [emergencyServiceTypeIndex]: prevState[emergencyServiceTypeIndex] + 1,
                    }
                });
            }
            }, this.vehicleSpeed  * (index+1));
        }
    }

    render() {

        if (this.state.emergency_services[this.props.disaster.id]) {
            return (
                <>
                    {this.routeES("fire_brigade")}
                    {this.routeES("police")}
                    {this.routeES("ambulance")}

                    {this.showESAnimations(this.props.disaster.already_addressed)}
                    
                </>
            )
        } else {
            return null;
        }
    }
    showESroutes(){
        
    }

    showESAnimations(alreadyAdressed){
        if(alreadyAdressed===false){
            return <>
            {this.animateIcon(FireTruckIcon,FireTruckIconFlipped,this.state.fire_brigade_coords,this.state.fire_brigade_index,this.vehicleSpeed)}
            {this.animateIcon(AmbulanceIcon,AmbulanceIconFlipped,this.state.ambulance_coords,this.state.ambulance_index,this.vehicleSpeed)}
            {this.animateIcon(PoliceCarIcon,PoliceCarIconFlipped,this.state.police_coords,this.state.police_index,this.vehicleSpeed)}
            {this.animateIcon(ArmyTankIcon,ArmyTankIconFlipped,this.state.army_coords,this.state.army_index,this.vehicleSpeed)}
            
            </>
            
        }
    }

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


    
    routeES(esType) {
        
        var lineWeight=10
        if(this.props.disaster.already_addressed===true || this.state[esType+"_animation"]!==true){
            console.log("ANIMATION DONE: "+this.props.disaster.id+" " +esType+ this.state[esType+"_animation"])
            lineWeight=5
            return (<>
                {this.state.emergency_services[this.props.disaster.id][esType].map((location, idx) => <>
                    <RoutingMachine key={`route-${idx}`}
                        lineColor={this.colorMap[esType]}
                        routeTravelMode={"walking"} 
                        lineWeight={lineWeight}

                        getRouteCoords={esType}
                        handleCoords={this.handleAnimation}
                        waypoints={[
                            L.latLng(this.props.disaster.lat, this.props.disaster.long),
                            L.latLng(location.lat, location.long),
                        ]} />
                </>
                )}
            </>);
            
            
        }
        
        if (this.state.emergency_services[this.props.disaster.id][esType]) {
            return (<>
                {this.state.emergency_services[this.props.disaster.id][esType].map((location, idx) => <>
                    <RoutingMachine key={`route-${idx}`}
                        lineColor={this.colorMap[esType]}
                        routeTravelMode={"walking"} 
                        animationClassName={esType}
                        lineWeight={lineWeight}

                        getRouteCoords={esType}
                        handleCoords={this.handleAnimation}
                        waypoints={[
                            L.latLng(this.props.disaster.lat, this.props.disaster.long),
                            L.latLng(location.lat, location.long),
                        ]} />
                </>
                )}
            </>);
        } else {
            return <></>;
        }
        
    }
}
