import React from "react";
import { Component } from 'react/cjs/react.production.min';
import Map from "../map/MapVerify"
import Title from "../Title"
import UserStatus from "../UserStatus";
// import { fetchResponseJson } from './fetchResponseJson'
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        // return fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/handshake').then((responseJson) => {
        //     this.setState({
        //         items: responseJson
        //     })
        // })
    }

    render() {
        return (<>
            <nav>
            </nav>
            <main>

                <Title />
                <h1>
                    Verify a disaster
                </h1>
                <UserStatus items={this.state.items}></UserStatus>
                <Map />

            </main>
        </>)

    }
};

export default Verify;