import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from './App';
import Report from './components/report/Report'
import WithNavigate from './components/login/Login'
import Verify from './components/emergencyServices/emergencyServices'
import reportWebVitals from './reportWebVitals';
import { RequireToken } from './components/login/Auth';
//import 'bootstrap/dist/css/bootstrap.min.css';

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
)

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
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
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
