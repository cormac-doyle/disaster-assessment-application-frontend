import * as ESAttributes from "./ESAttributes"

function getES(id) {
    switch (id) {
        case 0:
            return ESAttributes.Police
        case 1:
            return ESAttributes.FireStation
        case 2:
            return ESAttributes.Hospital
        case 3:
            return ESAttributes.Army
    
        default:
            return ESAttributes.Police
    }
}
export default getES