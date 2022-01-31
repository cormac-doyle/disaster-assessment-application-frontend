import React from "react";
import "./App.css";

import Map from "./components/Map/Map"

import { hot } from 'react-hot-loader/root';
import 'leaflet/dist/leaflet.css';

function App() {

  return (
    <>
      <nav>
      </nav>
      <main>
        <Map />
      </main>
    </>
  );
};

export default hot(App);
