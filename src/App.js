import React from "react";
import "./App.css";
import { Component } from 'react/cjs/react.production.min';
import Map from "./components/Map/Map"
import Title from "./components/Title"
import DisasterStatus from "./components/DisasterStatus";
import {fetchResponseJson} from './fetchResponseJson'
import 'leaflet/dist/leaflet.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: [],
    }
  }
  
  componentDidMount() {
    return fetchResponseJson('http://localhost:8000/').then((responseJson) => {
      this.setState({
        items: responseJson
      })
    })
  }

  render() {
    return(<>
      <nav>
      </nav>
      <main>
        
        <Title/>
        <DisasterStatus items = {this.state.items}></DisasterStatus>
        <Map />
        
      </main>
    </>)

  }
};

export default App;
