import React, { Component } from 'react'
import {
    Circle,
    Marker,
    Popup
} from "react-leaflet";
import getDisaster from "../DisasterTypes/DisasterWrapper"

export default class VerifyDisaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disasters: [],
        }
    }

    async componentDidMount() {

        const response = await fetch("https://ase-backend-2.herokuapp.com/api/1/disasters/?skip=0&limit=100&completed=False")
        const responseJson = await response.json()
        this.setState({
            disasters: responseJson
        })
        // console.log(responseJson)
    }

    getDisasterColor(verified) {
        if (verified) {
            return "green"
        }
        else {
            return "red"
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


        await fetch("https://ase-backend-2.herokuapp.com/api/1/disaster_verification", requestOptions)
            .then(() => {
                alert("Disaster " + details.id + " has been verified. The relevant emergency services have been notified.");
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


        await fetch("https://ase-backend-2.herokuapp.com/api/1/disaster_completion", requestOptions)
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

                            <Marker key={`marker-${idx}`} position={[disaster.lat, disaster.long]} icon={getDisaster(disaster.disaster_type).icon}>
                                <Popup>
                                    {/* {this.getDisaster(disaster.disaster_type).name} */}
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
