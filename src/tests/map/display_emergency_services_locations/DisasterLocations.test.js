import { fireEvent } from "@testing-library/react";
import DisasterLocations, { FireIcon } from "../../../components/map/display_emergency_services_locations/DisasterLocations"

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





//run parameterised test
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