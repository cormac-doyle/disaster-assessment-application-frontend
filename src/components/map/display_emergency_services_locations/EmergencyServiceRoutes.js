import React, { Component } from 'react'
import RoutingMachine from '../RoutingMachine';
import L from "leaflet";
import { fetchResponseJson } from '../../fetchResponseJson';

export default class EmergencyServiceRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emergency_services: [],
        }
    }
    componentDidMount() {
        return fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/get_nearest_services').then((responseJson) => {
            
            this.setState({
                emergency_services: responseJson
            })
            console.log(JSON.stringify(this.state.emergency_services))
        })
    }

  render() {
    if(this.state.emergency_services[this.props.disaster.id]){
        console.log("id acquired")
        return (
            <>
                {this.routeFireBrigades()}
                {this.routeAmbulances()}
                {this.routePolice()}
            </>
        )
    }else{
        return null;
    }
  }

    routeFireBrigades() {
        console.log("routing fire brigades...")
        console.log(JSON.stringify(this.state.emergency_services[this.props.disaster.id]["fire_brigade"]))
        if(this.state.emergency_services[this.props.disaster.id]["fire_brigade"]){
            console.log("fire_brigade acquired")
            return (<>
            {this.state.emergency_services[this.props.disaster.id]["fire_brigade"].map((fire_station_loc, idx) => 
            <>
                <RoutingMachine key={`route-${idx}`} 
                
                waypoints={[
                    L.latLng(this.props.disaster.lat, this.props.disaster.long),
                    L.latLng(fire_station_loc.lat, fire_station_loc.long),
                ]} />
            </>
            )}
        </>);
        } else{
            return <></>;
        }
        
    }

    routeAmbulances() {
        if(this.state.emergency_services[this.props.disaster.id]["ambulance"]){
            return (<>
            {this.state.emergency_services[this.props.disaster.id]["ambulance"].map((hospital_loc, idx) => <>
                <RoutingMachine key={`route-${idx}`} waypoints={[
                    L.latLng(this.props.disaster.lat, this.props.disaster.long),
                    L.latLng(hospital_loc.lat, hospital_loc.long),
                ]} />
            </>
            )}
        </>);
        } else{
            return <></>;
        }
    }

    routePolice() {
        if(this.state.emergency_services[this.props.disaster.id]["police"]){
            return (<>
            {this.state.emergency_services[this.props.disaster.id]["police"].map((police_station_loc, idx) => <>
                <RoutingMachine key={`route-${idx}`} waypoints={[
                    L.latLng(this.props.disaster.lat, this.props.disaster.long),
                    L.latLng(police_station_loc.lat, police_station_loc.long),
                ]} />
            </>
            )}
        </>);
        } else{
            return <></>;
        }
    }

}
