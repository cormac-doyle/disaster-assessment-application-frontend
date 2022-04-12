import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import App from './App';
import Report from './components/report/Report'
import WithNavigate from './components/login/Login'
import Verify from './components/emergencyServices/emergencyServices'
import { RequireToken } from './components/login/Auth';


i18n
   .use(HttpApi)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
     supportedLngs: ['en', 'ga'],
     fallbackLng: 'en',
     debug: false,
     detection: {
       order: ['path', 'cookie', 'htmlTag'],
       caches: ['cookie'],
     },
     react: {useSuspense: false},
     backend: {
       loadPath: '/assets/locales/{{lng}}/translation.json',
     },
   })


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
