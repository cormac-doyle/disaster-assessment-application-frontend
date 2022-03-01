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
    return (
        <>
        {/* {this.state.emergency_services.map((location,idx) =>
        <>
        <RoutingMachine key={`route-${idx}`} waypoints={[
            L.latLng(this.props.disaster.lat, this.props.disaster.long),
            L.latLng(location["first nearest"].lat , location["first nearest"].long),
        ]} />
        </>
        )} */}
        </>
        
    )
  }
}
