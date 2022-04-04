import * as DisasterAttributes from "./DisasterAttributes"

function getDisaster(id) {
    switch (id) {
        case 0:
            return DisasterAttributes.Fire
        case 1:
            return DisasterAttributes.Flood
        case 2:
            return DisasterAttributes.Traffic
        case 3:
            return DisasterAttributes.Disturbance
        case 4:
            return DisasterAttributes.BioHazard
        case 5:
            return DisasterAttributes.Meteor
        case 6:
            return DisasterAttributes.Storm
        default:
            return DisasterAttributes.Alert
    }
}

export default getDisaster

