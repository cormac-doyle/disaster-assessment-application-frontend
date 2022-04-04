import VerifyDisaster from "../../components/verify/VerifyDisaster";

const disasterVerifyParams = [
    [true, "green"],
    [false, "red"]
]

describe("test get Disaster Verify Colour", () => {
    test.each(disasterVerifyParams)(
        `should return correct color green for verified`,
        (input, result) => {
            const verifyDisaster = new VerifyDisaster()
            const output = verifyDisaster.getDisasterColor(input)

            expect(output).toEqual(result);
        }
    );
});