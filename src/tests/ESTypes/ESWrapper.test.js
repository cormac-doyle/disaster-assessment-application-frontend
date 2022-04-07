import getES from "../../components/ESTypes/ESWrapper";
import L from "leaflet";

const ESIconParams = [
    //[param, result]
    [3, L.icon({
        iconUrl: "army.png",
        iconSize: [50, 50],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    })],

    [2, L.icon({
        iconUrl: "hospital.png",
        iconSize: [40, 40],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    })],

    [1, L.icon({
        iconUrl: "firestation.png",
        iconSize: [40, 40],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    })],

    [0, L.icon({
        iconUrl: "policeIcon.png",
        iconSize: [40, 40],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    })]
];


//run parameterised test on enumerations
//const disasterLocations = new DisasterLocations()

describe("test getES Icons", () => {
    test.each(ESIconParams)(
        `should return correct icon`,
        (input, result) => {
            const output = getES(input).icon

            expect(output).toEqual(result);
        }
    );
});