import React, { Component } from 'react'
import {
    Circle,
    Marker,
    Popup
} from "react-leaflet";
import L from "leaflet";

const FloodIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/flood.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const FireIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/fire.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const TrafficIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/crash.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [2, -40],
});

const BioHazardIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/biohazard.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const MeteorIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/meteor.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const StormIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/storm.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [2, -40],
});

const AlertIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/alert.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [2, -40],
});
const DisturbanceIcon = L.icon({
    iconUrl: require("../map/display_emergency_services_locations/images/disturbance.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [2, -40],
});


export default class VerifyDisaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disasters: [],
        }
    }

    async componentDidMount() {

        const response = await fetch("http://localhost:8000/api/1/disasters/?skip=0&limit=100&completed=False")
        const responseJson = await response.json()
        this.setState({
            disasters: responseJson
        })
        // console.log(responseJson)
    }

    getDisasterIcon(id) {
        if (id === 0) {
            return FireIcon
        }
        else if (id === 1) {
            return FloodIcon
        }
        else if (id === 2) {
            return TrafficIcon
        }
        else if (id === 3) {
            return DisturbanceIcon
        }
        else if (id === 4) {
            return BioHazardIcon
        }
        else if (id === 5) {
            return MeteorIcon
        }
        else if (id === 6) {
            return StormIcon
        }
        else if (id === 7) {
            return AlertIcon
        }
    }

    getDisasterName(type) {
        if (type === 0) {
            return "Fire"
        }
        if (type === 1) {
            return "Flood"
        }
        if (type === 2) {
            return "Traffic Incident"
        }
        if (type === 3) {
            return "Public Disturbance"
        }
        if (type === 4) {
            return "Bio Hazard"
        }
        if (type === 5) {
            return "Meteor"
        }
        if (type === 6) {
            return "Storm"
        }
        if (type === 7) {
            return "Other"
        }
    }
    getDisasterColor(verified) {
        if (verified === true) {
            return "green"
        }
        if (verified === false) {
            return "red"
        }
        else {
            return "grey"
        }
    }

    async verifyDisaster(details, newScale, newDisaster) {

        const requestOptions = {
            method: "post",
            //mode: 'no-cors',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: details.id,
                scale: newScale,
                radius: newDisaster
            }),
        };


        await fetch("http://localhost:8000/api/1/disaster_verification", requestOptions)
            .then(() => {
                alert("Disaster " + details.id + " has been verified");
                console.log("Verified: " + details.id)
                window.location.reload(false);
            }).catch(error => {
                alert("Verification failed...");
                console.log(error)

            });

    }


    async completeDisaster(details) {

        const requestOptions = {
            method: "post",
            //mode: 'no-cors',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: details.id,
                complete: true
            }),
        };


        await fetch("http://localhost:8000/api/1/disaster_completion", requestOptions)
            .then(() => {
                alert("Disaster " + details.id + " has been completed");
                console.log("Completed: " + details.id)
                window.location.reload(false);
            }).catch(error => {
                alert("Completion failed...");
                console.log(error)

            });

    }




    handleClick = (e, s, r, type) => {

        console.log(s)

        if (type === "verify") {
            if (s === 0) {
                s = e.scale
            }
            if (r === 0) {
                r = e.radius
            }

            console.log("Verifiying disaster: " + e.id);
            this.verifyDisaster(e, s, r)
        }
        else {
            console.log("Ending Disaster... Phew!");
            this.completeDisaster(e);

        }


    }

    handleEntailmentRequest(e) {
        e.preventDefault();
    }


    render() {

        let scale = 0
        let radius = 0

        if (this.state.disasters.length > 0) {
            return (
                <>
                    {this.state.disasters.map((disaster, idx) =>

                        <Circle
                            key={`marker-${idx}`}
                            center={[disaster.lat, disaster.long]}
                            radius={disaster.radius}
                            color={this.getDisasterColor(disaster.verified)}>

                            <Marker key={`marker-${idx}`} position={[disaster.lat, disaster.long]} icon={this.getDisasterIcon(disaster.disaster_type)}>
                                <Popup>
                                    {/* {this.getDisasterName(disaster.disaster_type)} */}
                                    <form>
                                        <label>
                                            Scale:
                                            <input type="text" placeholder={disaster.scale} name="Scale" onChange={(e) => scale = e.target.value} />
                                        </label>
                                    </form>
                                    <form>
                                        <label>
                                            Radius:
                                            <input type="text" placeholder={disaster.radius} name="Scale" onChange={(e) => radius = e.target.value} />
                                        </label>
                                    </form>
                                    <button onClick={(e) => { this.handleEntailmentRequest(e); this.handleClick(disaster, scale, radius, "verify"); }}>Verify</button>
                                    <button onClick={(e) => { this.handleEntailmentRequest(e); this.handleClick(disaster, scale, radius, "complete"); }}>End</button>
                                </Popup>
                            </Marker>
                        </Circle>

                    )}
                </>


            )
        } else {
            return null
        }

    }
}