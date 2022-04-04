import L from "leaflet";

export const Hospital = {
    name: "Hospital",

    icon: L.icon({
        iconUrl: require("./images/hospital.png"),
        iconSize: [40, 40],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    })
}

export const FireStation = {
    name: "Fire Station",

    icon: L.icon({
        iconUrl: require("./images/firestation.png"),
        iconSize: [40, 40],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    })
}

export const Police = {
    name: "Police",

    icon: L.icon({
        iconUrl: require("./images/policeIcon.png"),
        iconSize: [40, 40],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    })
}