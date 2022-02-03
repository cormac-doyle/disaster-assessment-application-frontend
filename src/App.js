import React from "react";
import "./App.css";

import Map from "./components/Map/Map"
import Title from "./components/Title"
import DisasterStatus from "./components/DisasterStatus";

import { hot } from 'react-hot-loader/root';
import 'leaflet/dist/leaflet.css';

function App() {

  return (
    <>
      <nav>
      </nav>
      <main>
        
        <Title/>
        <DisasterStatus/>
        <Map />
        
        
      </main>
    </>
  );
};

export default hot(App);
