import React from "react";
import { Component } from 'react/cjs/react.production.min';
import Map from "../map/MapVerify"
import Title from "../Title"
import UserStatus from "../UserStatus";
import { useTranslation } from "react-i18next";
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
        // return fetchResponseJson('http://localhost:8000/api/1/handshake').then((responseJson) => {
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
                <VerifyDisasterText />
                <UserStatus items={this.state.items}></UserStatus>
                <Map />

            </main>
        </>)

    }
};
function VerifyDisasterText() {
    const { t } = useTranslation()
    return (
        <h1>
            {t("VerifyDisaster")}
        </h1>
    )
}

export default Verify;