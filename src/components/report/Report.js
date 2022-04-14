import React from "react";
import { Component } from 'react/cjs/react.production.min';
import Map from "../map/MapDisaster"
import Title from "../Title"
import UserStatus from "../UserStatus";
import { useTranslation } from "react-i18next";
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchResponseJson } from '../fetchResponseJson'
import { urlVar } from '../../url_confg'



class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            language: 'eng'
        }
    }

    //get user ip
    componentDidMount() {
        return fetchResponseJson(urlVar + '/api/1/handshake').then((responseJson) => {
            this.setState({
                items: responseJson
            })
        })
    }



    render() {
        return (<>
            <nav>
            </nav>
            <main>

                <Title />
                <ReportDisasterText />
                <UserStatus items={this.state.items}></UserStatus>
                <Map />

            </main>
        </>)

    }
};

//translations
function ReportDisasterText() {
    const { t } = useTranslation()
    return (
        <h1>
            {t("report_disaster")}
        </h1>
    )
}

export default Report;
