import * as ESAttributes from "./ESAttributes"

function getES(id) {
    switch (id) {
        case 0:
            return ESAttributes.Police
        case 1:
            return ESAttributes.FireStation
        case 2:
            return ESAttributes.Hospital

        default:
            return ESAttributes.Police
    }
}
export default getES