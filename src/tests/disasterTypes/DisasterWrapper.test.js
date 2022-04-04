import getDisaster from "../../components/DisasterTypes/DisasterWrapper";
import L from "leaflet";

const disasterIconParams = [
    //[param, result]
    [0, L.icon({
        iconUrl: "fire.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })],

    [1, L.icon({
        iconUrl: "flood.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })],

    [2, L.icon({
        iconUrl: "crash.png",
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [2, -40],
    })],

    [3, L.icon({
        iconUrl: "disturbance.png",
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [2, -40],
    })],

    [4, L.icon({
        iconUrl: "biohazard.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })],

    [5, L.icon({
        iconUrl: "meteor.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })],

    [6, L.icon({
        iconUrl: "storm.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [2, -40],
    })],

    [7, L.icon({
        iconUrl: "alert.png",
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [2, -40],
    })]
];

const disasterNameParams = [
    //[param, result]
    [0, "Fire"],
    [1, "Flood"],
    [2, "Traffic Incident"],
    [3, "Public Disturbance"],
    [4, "Bio Hazard"],
    [5, "Meteor"],
    [6, "Storm"],
    [7, "Alert"]
];

const disasterColorParams = [
    //[param, result]
    [0, "red"],
    [1, "blue"],
    [2, "grey"],
    [3, "grey"],
    [4, "green"],
    [5, "red"],
    [6, "blue"],
    [7, "red"]
];




//run parameterised test on enumerations
//const disasterLocations = new DisasterLocations()

describe("test getDisaster Icons", () => {
    test.each(disasterIconParams)(
        `should return correct icon`,
        (input, result) => {
            const output = getDisaster(input).icon

            expect(output).toEqual(result);
        }
    );
});

describe("test getDisaster Name", () => {
    test.each(disasterNameParams)(
        `should return correct name`,
        (input, result) => {
            const output = getDisaster(input).name

            expect(output).toEqual(result);
        }
    );
});

describe("test getDisaster Color", () => {
    test.each(disasterColorParams)(
        `should return correct color`,
        (input, result) => {
            const output = getDisaster(input).colour

            expect(output).toEqual(result);
        }
    );
});