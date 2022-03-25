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
    })]
];





//run parameterised test on enumerations
const disasterLocations = new DisasterLocations()

describe("test getDisasterIcons", () => {
    test.each(disasterIconParams)(
        `should return correct enumeration`,
        (input, result) => {
            const output = disasterLocations.getDisasterIcon(input)

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