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
                                color={getDisaster(disaster.disaster_type).colour}>
                                <Marker key={`marker-${idx}`} position={[disaster.lat, disaster.long]} icon={getDisaster(disaster.disaster_type).icon}>
                                    <Popup>{getDisaster(disaster.disaster_type).name}</Popup>
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
