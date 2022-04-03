import React, { Component } from 'react'
import RoutingMachine from '../RoutingMachine';
import L from "leaflet";
import { fetchResponseJson } from '../../fetchResponseJson';
import {LeafletTrackingMarker} from 'react-leaflet-tracking-marker'


const FireTruckIcon = L.icon({
    iconUrl: require("./images/fireTruckIcon.png"),
    iconSize: [45, 45],
  });
  const FireTruckIconFlipped = L.icon({
    iconUrl: require("./images/fireTruckIconFlipped.png"),
    iconSize: [45, 45],
  });

  const PoliceCarIcon = L.icon({
    iconUrl: require("./images/policeCarIcon.png"),
    iconSize: [50, 50],
  });
  const PoliceCarIconFlipped = L.icon({
    iconUrl: require("./images/policeCarIconFlipped.png"),
    iconSize: [50, 50],
  });
  const AmbulanceIcon = L.icon({
    iconUrl: require("./images/abulanceIcon.png"),
    iconSize: [50, 50],
  });
  const AmbulanceIconFlipped = L.icon({
    iconUrl: require("./images/ambulanceIconFlipped.png"),
    iconSize: [50, 50],
  });
  const ArmyTankIcon = L.icon({
    iconUrl: require("./images/armyTankIcon.png"),
    iconSize: [50, 50],
  });
  const ArmyTankIconFlipped = L.icon({
    iconUrl: require("./images/armyTankIconFlipped.png"),
    iconSize: [50, 50],
  });

export default class EmergencyServiceRoutes extends Component {

    vehicleSpeed = 400

    constructor(props) {
        super(props);
        this.state = {
            emergency_services: [],
            fireTruckRouteCoords: [],
            fireTruckRouteCoordsIndex:1,
            policeCarRouteCoords: [],
            policeCarRouteCoordsIndex:1,
            ambulanceRouteCoords: [],
            ambulanceRouteCoordsIndex:1,
            armyRouteCoords: [],
            armyRouteCoordsIndex:1,
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
        
        coords.reverse()
        var emergencyServiceTypeIndex = emergencyServiceType + "Index"
        this.setState(
            {
             [emergencyServiceType]:coords,
            })
        console.log("Animating: "+emergencyServiceType)
        console.log("Received Route Coords: "+this.state[emergencyServiceType])
        for (let index = 0; index < this.state[emergencyServiceType].length; index++) {
            setTimeout(() => {
            if(this.state[emergencyServiceTypeIndex]===this.state[emergencyServiceType].length-1){
                this.setState({[emergencyServiceType]:[]})
                this.setState({[emergencyServiceTypeIndex]:1})
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
        return<>{this.testRoute("#ff5900","fireTruckRouteCoords",L.latLng(53.358,-6.2782),'fire')}
                {this.animateIcon(FireTruckIcon,FireTruckIconFlipped,this.state.fireTruckRouteCoords,this.state.fireTruckRouteCoordsIndex,this.vehicleSpeed)}
                {this.testRoute("#f54242","ambulanceRouteCoords",L.latLng(53.348,-6.2702),'ambulance')}
                {this.animateIcon(AmbulanceIcon,AmbulanceIconFlipped,this.state.ambulanceRouteCoords,this.state.ambulanceRouteCoordsIndex,this.vehicleSpeed)}
                {this.testRoute("#2509b3","policeCarRouteCoords",L.latLng(53.339,-6.2702),'police')}
                {this.animateIcon(PoliceCarIcon,PoliceCarIconFlipped,this.state.policeCarRouteCoords,this.state.policeCarRouteCoordsIndex,this.vehicleSpeed)}
                {this.testRoute("#1b6932","armyRouteCoords",L.latLng(53.39,-6.292),'army')}
                {this.animateIcon(ArmyTankIcon,ArmyTankIconFlipped,this.state.armyRouteCoords,this.state.armyRouteCoordsIndex,this.vehicleSpeed)}

                </>
        if (this.state.emergency_services[this.props.disaster.id]) {
            return (
                <>
                    {this.routeFireBrigades()}
                    {this.routePolice()}
                    
                    {this.routeAmbulances()}

                    {this.animateIcon(FireTruckIcon,FireTruckIconFlipped,this.state.fireTruckRouteCoords,this.state.fireTruckRouteCoordsIndex,this.vehicleSpeed)}
                    {this.animateIcon(PoliceCarIcon,PoliceCarIconFlipped,this.state.policeCarRouteCoords,this.state.policeCarRouteCoordsIndex,this.vehicleSpeed)}
                    {this.animateIcon(AmbulanceIcon,AmbulanceIconFlipped,this.state.ambulanceRouteCoords,this.state.ambulanceRouteCoordsIndex,this.vehicleSpeed)}



                    
                </>
            )
        } else {
            return null;
        }
    }

    animateIcon(icon,flippedIcon, polyline, index, speed){
        if(polyline.length>0){
            var animateIcon = icon
            if(polyline[index-1].lng >polyline[index].lng){
                animateIcon = flippedIcon
            }
            return <LeafletTrackingMarker 
            icon={animateIcon} 
            position={[polyline[index].lat ,polyline[index].lng]} 
            previousPosition={[polyline[index-1].lat ,polyline[index-1].lng]}
            duration={speed} />
            
        }
    }
    
    testRoute(lineColor, esTypeCoords,location,animClassName){
        return <RoutingMachine 
        lineColor={lineColor}
        routeTravelMode={"walking"} 
        animationClassName={animClassName}
        getTime={true}
        handleTime={this.handleTime}
        getRouteCoords={esTypeCoords}
        handleCoords={this.handleAnimation}
        waypoints={[
        L.latLng(53.355222991969484,-6.297140121459961),
        location,
        
    ]} />
    }

    routeFireBrigades() {
        
        if (this.state.emergency_services[this.props.disaster.id]["fire_brigade"]) {
            console.log("Routing fire")
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
                        animationClassName='evac-route-line'
                        getRouteCoords={"ambulanceRouteCoords"}
            handleCoords={this.handleAnimation}
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
