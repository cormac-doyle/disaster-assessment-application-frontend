import React, {useState} from 'react'
import ReportDisasterPopUp from './ReportDisasterPopUp'
import Map from './Map/Map'


export default function DisasterStatus() {
    const [reportDisasterPopup, setreportDisasterPopup] = useState (false)

    return (
        
        <div>
        <button onClick={ () => setreportDisasterPopup(true)}>
            ReportDisaster</button>
        
        <ReportDisasterPopUp trigger={reportDisasterPopup}>
            <h1>Report Disaster?</h1>
        </ReportDisasterPopUp>
        
        </div>
    )
}