import React from "react";
import { Component } from 'react/cjs/react.production.min';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }

    render() {
        return (<>
            <nav>
            </nav>
            <main>

                {/* <Title /> */}
                <div>
                    I am another new page
                </div>

            </main>
        </>)

    }
};

export default Login;