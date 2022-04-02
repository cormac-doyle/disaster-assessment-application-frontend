import React, { Component } from 'react'
import RoutingMachine from '../RoutingMachine';
import L from "leaflet";
import { fetchResponseJson } from '../../fetchResponseJson';
import {LeafletTrackingMarker} from 'react-leaflet-tracking-marker'


const FireTruckIcon = L.icon({
    iconUrl: require("./images/fireTruckIcon.png"),
    iconSize: [45, 45],
    
  });


  const PoliceCarIcon = L.icon({
    iconUrl: require("./images/policeCarIcon.png"),
    iconSize: [60, 60],

  });

export default class EmergencyServiceRoutes extends Component {
    vehicleSpeed = 1000
    constructor(props) {
        super(props);
        this.state = {
            emergency_services: [],
            fireTruckRouteCoords: [],
            fireTruckRouteCoordsIndex:0,
            policeCarRouteCoords: [],
            policeCarRouteCoordsIndex:0,
            ambulanceRouteCoords: [],
            ambulanceRouteCoordsIndex:0
        }
    }
   

    componentDidMount() {
        return fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/get_nearest_services').then((responseJson) => {

            this.setState({
                emergency_services: responseJson
            })
            console.log("ES routes: "+JSON.stringify(this.state.emergency_services))
        })
    }

    handleTime = (time) => {
        console.log("Received time")
    }
    handleAnimation = (coords, emergencyServiceType) => {
        var emergencyServiceTypeIndex = emergencyServiceType + "Index"
        this.setState(
            {
             [emergencyServiceType]:coords,
            })
        console.log("Received Route Coords: "+this.state[emergencyServiceType])
        for (let index = 0; index < this.state[emergencyServiceType].length; index++) {
            setTimeout(() => {
            if(this.state[emergencyServiceTypeIndex]===this.state[emergencyServiceType].length-1){
                this.setState({[emergencyServiceType]:[]})
                this.setState({[emergencyServiceTypeIndex]:0})
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
                    {this.routeFireBrigades()}
                    {this.animateFireTruck()}
                    {this.routePolice()}
                    {this.animatePoliceCar()}
                    {this.routeAmbulances()}
                </>
            )
        } else {
            return null;
        }

    }
    animateFireTruck(){
        if(this.state.fireTruckRouteCoords.length>0){
            return <LeafletTrackingMarker 
            icon={FireTruckIcon} 
            position={this.state.fireTruckRouteCoords[this.state.fireTruckRouteCoordsIndex]} 
            previousPosition={this.state.fireTruckRouteCoords[this.state.fireTruckRouteCoordsIndex-1]} 
            duration={this.vehicleSpeed} />
        }
    }
    animatePoliceCar(){
        if(this.state.policeCarRouteCoords.length>0){
            return <LeafletTrackingMarker 
            icon={PoliceCarIcon} 
            position={this.state.policeCarRouteCoords[this.state.policeCarRouteCoordsIndex]} 
            previousPosition={this.state.policeCarRouteCoords[this.state.policeCarRouteCoordsIndex-1]} 
            duration={this.vehicleSpeed} />
        }
    }
    animateAmbulance(){
        if(this.state.ambulanceRouteCoords.length>0){
            return <LeafletTrackingMarker 
            icon={PoliceCarIcon} 
            position={this.state.ambulanceRouteCoords[this.state.ambulanceRouteCoordsIndex]} 
            previousPosition={this.state.ambulanceRouteCoords[this.state.ambulanceRouteCoordsIndex-1]} 
            duration={this.vehicleSpeed} />
        }
    }
    routeFireBrigades() {
        if (this.state.emergency_services[this.props.disaster.id]["fire_brigade"]) {
            return (<>
                {this.state.emergency_services[this.props.disaster.id]["fire_brigade"].map((fire_station_loc, idx) => <>
                    <RoutingMachine key={`route-${idx}`}
                        lineColor="#ff5900"
                        routeTravelMode={"walking"} 
                        animationClassName='evac-route-line'
                        getTime={true}
                        handleTime={this.handleTime}
                        getRouteCoords={"fireTruckRouteCoords"}
                        handleCoords={this.handleAnimation}
                        waypoints={[
                            L.latLng(fire_station_loc.lat, fire_station_loc.long),
                            L.latLng(this.props.disaster.lat, this.props.disaster.long),
                        ]} />
                </>
                )}
            </>);
        } else {
            return null;
        }

    }

    routeAmbulances() {
        if (this.state.emergency_services[this.props.disaster.id]["ambulance"]) {
            return (<>
                {this.state.emergency_services[this.props.disaster.id]["ambulance"].map((hospital_loc, idx) => <>
                    <RoutingMachine key={`route-${idx}`}
                        lineColor="#f54242"
                        routeTravelMode={"walking"} 
                        animationClassName='animate'
                        waypoints={[
                            L.latLng(hospital_loc.lat, hospital_loc.long),
                            L.latLng(this.props.disaster.lat, this.props.disaster.long),
                        ]} />
                </>
                )}
            </>);
        } else {
            return <></>;
        }
    }

    routePolice() {
        if (this.state.emergency_services[this.props.disaster.id]["police"]) {
            return (<>
                {this.state.emergency_services[this.props.disaster.id]["police"].map((police_station_loc, idx) => <>
                    <RoutingMachine key={`route-${idx}`}
                        lineColor="#2509b3"
                        routeTravelMode={"walking"} 
                        animationClassName='animate'
                        waypoints={[
                            L.latLng(police_station_loc.lat, police_station_loc.long),
                            L.latLng(this.props.disaster.lat, this.props.disaster.long),
                        ]} />
                </>
                )}
            </>);
        } else {
            return <></>;
        }
    }

}
