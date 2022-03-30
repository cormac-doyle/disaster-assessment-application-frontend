import DisasterLocations from "../../../components/map/display_emergency_services_locations/DisasterLocations"

//testing enumeration

//params to test all enumerated values
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
    [7, "Other"]
];

const disasterColorParams = [
    //[param, result]
    [0, "red"],
    [1, "blue"],
    [2, "grey"],
    [3, "grey"],
    [4, "yellow"],
    [5, "orange"],
    [6, "blue"],
    [7, "grey"]
];




//run parameterised test on enumerations
//const disasterLocations = new DisasterLocations()

let disasterLocations;

beforeEach(() => {
    disasterLocations = new DisasterLocations()
})

describe("test getDisasterIcons", () => {
    test.each(disasterIconParams)(
        `should return correct enumeration`,
        (input, result) => {
            const output = disasterLocations.getDisasterIcon(input)

            expect(output).toEqual(result);
        }
    );
});

describe("test getDisasterName", () => {
    test.each(disasterNameParams)(
        `should return correct enumeration`,
        (input, result) => {
            const output = disasterLocations.getDisasterName(input)

            expect(output).toEqual(result);
        }
    );
});

describe("test getDisasterColor", () => {
    test.each(disasterColorParams)(
        `should return correct enumeration`,
        (input, result) => {
            const output = disasterLocations.getDisasterColor(input)

            expect(output).toEqual(result);
        }
    );
});


// jest.mock('../../../components/map/display_emergency_services_locations/DisasterLocations', () => ({
//     fetchDisasters: jest.fn()
// }));


// describe("test render", () => {
//     test('without params', () => {
//         fetchDisasters.mockReturnValue('{[]}');

//         const output = disasterLocations.render(<DisasterLocations />)

//         expect(rendered.state.disasters.length).toEqual(0);  // SUCCESS

//         mock.mockRestore();  // restore original implementa
//     });
// });