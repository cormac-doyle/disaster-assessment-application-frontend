import React from "react";
import { Component } from 'react/cjs/react.production.min';
// import Map from "./components/Map/Map"
// import Title from "./components/Title"
// import DisasterStatus from "./components/DisasterStatus";
// import { fetchResponseJson } from './fetchResponseJson'
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }

    // componentDidMount() {
    //     return fetchResponseJson('http://localhost:8000/').then((responseJson) => {
    //         this.setState({
    //             items: responseJson
    //         })
    //     })
    // }

    render() {
        return (<>
            <nav>
            </nav>
            <main>

                {/* <Title /> */}
                <div>
                    I am a new page
                </div>
                {/* <DisasterStatus items={this.state.items}></DisasterStatus> */}
                {/* <Map /> */}

            </main>
        </>)

    }
};

export default Report;