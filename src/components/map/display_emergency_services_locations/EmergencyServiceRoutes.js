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
            console.log("ES routes: "+JSON.stringify(this.state.emergency_services))
        })
    }

    handleTime = (time) => {
        console.log("Received time")
    }

    render() {
        if (this.state.emergency_services[this.props.disaster.id]) {
            return (
                <>
                    {this.routeFireBrigades()}
                    {this.routePolice()}
                    {this.routeAmbulances()}
                </>
            )
        } else {
            return null;
        }

    }

    routeFireBrigades() {
        if (this.state.emergency_services[this.props.disaster.id]["fire_brigade"]) {
            return (<>
                {this.state.emergency_services[this.props.disaster.id]["fire_brigade"].map((fire_station_loc, idx) => <>
                    <RoutingMachine key={`route-${idx}`}
                        lineColor="#ff5900"
                        routeTravelMode={"walking"} 
                        animationClassName='animate'
                        getTime={true}
                        handleTime={this.handleTime}
                        waypoints={[
                            L.latLng(fire_station_loc.lat, fire_station_loc.long),
                            L.latLng(this.props.disaster.lat, this.props.disaster.long),
                        ]} />
                </>
                )}
            </>);
        } else {
            return <></>;
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
