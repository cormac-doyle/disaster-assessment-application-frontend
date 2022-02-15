import React from 'react'


function UserStatus(props){
    
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
        return<span style={style}>User ID: Loading...</span>;
      } 
    else{
        return (
            <div style={style}>
                <span>UserID identified. Ready To Report</span>
            </div>
        )
    }  
}

export default UserStatus;
