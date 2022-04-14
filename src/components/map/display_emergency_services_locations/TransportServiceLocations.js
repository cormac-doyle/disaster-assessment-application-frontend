import React, { Component } from 'react'
import {
    Marker,
    Popup
} from "react-leaflet";
import { fetchResponseJson } from '../../fetchResponseJson'
import L from "leaflet";

const BusIcon = L.icon({
    iconUrl: require("../../ESTypes/images/bus-stop.png"),
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

//display icons of transport service locations
export default class TransportServiceLocations extends Component {

    constructor(props) {
        super(props);
        fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/transport_services').then((responseJson) => {

            this.setState({
                markers: responseJson

            })
            //console.log(this.state.markers[0])
        })
        this.state = {
            markers: [],
        }
    }



    get_icon(id) {
        return BusIcon

    }

    render() {
        if (this.state.markers.length > 0) {
            return (
                <>
                    {this.state.markers.map((location, idx) =>
                        <>
                            <Marker key={`marker-${idx}`} position={[location.lat, location.long]} icon={this.get_icon(location.type)} >
                                <Popup>{location.name}</Popup>
                            </Marker>
                        </>

                    )}
                </>


            )
        } else {
            return null
        }

    }
}
