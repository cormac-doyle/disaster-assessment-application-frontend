import React from "react";
import "./App.css";
import { Component } from 'react/cjs/react.production.min';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home/Home";
import { fetchResponseJson } from "./components/home/fetchResponseJson";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    return fetchResponseJson('https://ase-backend-2.herokuapp.com/api/1/handshake').then((responseJson) => {
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
        <Home />
      </main>
    </>)

  }
};

export default App;

