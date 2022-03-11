import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from './App';
import Report from './components/report/Report'
import WithNavigate from './components/login/Login'
import Verify from './components/emergencyServices/EmergencyServices'
import reportWebVitals from './reportWebVitals';
import { RequireToken } from './components/login/Auth';
//import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/report" element={<Report />} />
        <Route path="/login" element={<WithNavigate />} />
        <Route path="/disaster_verification" element={<RequireToken><Verify /></RequireToken>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
