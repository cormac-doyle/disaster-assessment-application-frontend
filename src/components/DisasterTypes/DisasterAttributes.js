import L from "leaflet";

export const Flood = {
    name: "Flood",
    colour: "blue",

    icon: L.icon({
        iconUrl: require("./images/flood.png"),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })
};

export const Fire = {
    name: "Fire",
    colour: "red",

    icon: L.icon({
        iconUrl: require("./images/fire.png"),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })
};

export const Traffic = {
    name: "Traffic Incident",
    colour: "grey",

    icon: L.icon({
        iconUrl: require("./images/crash.png"),
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [2, -40],
    })
};

export const BioHazard = {
    name: "Bio Hazard",
    colour: "green",

    icon: L.icon({
        iconUrl: require("./images/biohazard.png"),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })
};

export const Meteor = {
    name: "Meteor",
    colour: "red",

    icon: L.icon({
        iconUrl: require("./images/meteor.png"),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })
};

export const Storm = {
    name: "Storm",
    colour: "blue",

    icon: L.icon({
        iconUrl: require("./images/storm.png"),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })
};

export const Alert = {
    name: "Alert",
    colour: "red",

    icon: L.icon({
        iconUrl: require("./images/alert.png"),
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [2, -40],
    })
};

export const Disturbance = {
    name: "Public Disturbance",
    colour: "grey",

    icon: L.icon({
        iconUrl: require("./images/disturbance.png"),
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [2, -40],
    })
};
