import React from 'react'


function DisasterStatus(props){
    
    const style ={
        fontSize: 15,
        fontWeight: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        fontFamily: 'sans-serif',
    }

    if(props.items.length===0){
        return<span style={style}>Disaster Status: Loading...</span>;
      } 
    else{
        return (
            <div style={style}>
                <span>Disaster Status: {JSON.stringify(props.items)}</span>
            </div>
        )
    }  
}

export default DisasterStatus;