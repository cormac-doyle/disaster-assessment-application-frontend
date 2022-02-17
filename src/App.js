import React from "react";
import "./App.css";
import { Component } from 'react/cjs/react.production.min';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home/Home";

class App extends Component {

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
        <Home />
      </main>
    </>)

  }
};

export default App;

