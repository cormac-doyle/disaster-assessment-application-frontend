import React from 'react'
import { useTranslation } from "react-i18next";


function UserStatus(props) {
    const { t } = useTranslation();
    const style = {
        fontSize: 15,
        fontWeight: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        fontFamily: 'sans-serif',
    }

    if (props.items.length === 0) {
        return <span style={style}>{t("user_id_unavailable")}</span>;
    }
    else {
        return (
            <div style={style}>
                <span>{t("user_id_available")}</span>
            </div>
        )
    }
}

export default UserStatus;
