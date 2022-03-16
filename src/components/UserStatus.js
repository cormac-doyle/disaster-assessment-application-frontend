import React from 'react'
import {useTranslation} from "react-i18next";

function UserStatus(props){
    const {t} = useTranslation()
    
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
        return<span style={style}>{t("user_status")}</span>;
      } 
    else{
        return (
            <div style={style}>
                <span>{t("user_identifier")}</span>
            </div>
        )
    }  
}

export default UserStatus;
