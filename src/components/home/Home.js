import React from "react";
import "../../App.css";
import { Component } from 'react/cjs/react.production.min';
import Map from "../map/MapTraffic"
import Title from "../Title"
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from "react-i18next";
import { fetchResponseJson } from "../fetchResponseJson";


class Home extends Component {

    constructor(props) {
        super(props);
        //call this to add all services to database (CORS issue error atm)
        fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/add_all_services');
        this.state = {
            items: [],
            language:"eng"
        }
    }

    getLanguage = (lang) => {
        console.log("Language code: " + lang)
        this.setState({language:lang})
    }

    render() {
        return (<>
            <nav>
            </nav>
            <main>
                <Title getLanguage={this.getLanguage} />
                <GDPRAlert />
                <Map language={this.state.language}/>
            </main>
        </>)
    }
};

export default Home;


function GDPRAlert() {
    const [show, setShow] = useState(true);
    const { t } = useTranslation();

    if (show) {
        return (
            <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{t("Disclaimer")}</Alert.Heading>
                <p>
                    {t("GDPR_text")}
                </p>
            </Alert>
        );
    }
    return null;
}
