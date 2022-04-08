// Get disasters
import {urlVar} from '../url_confg'
export default async function fetchDisasters() {

console.log(urlVar)


    const requestOptions = {
        method: "get",
        headers: {
            "Content-type": "application/json",
        }
    };

    const disasters = await fetch(urlVar+"/api/1/disasters-civ/", requestOptions)
        .then(response => {
            if (!response.ok) { throw response }
            return response.json()
        })
        .then(() => {
            console.log("Fetched Disasters.")
        }).catch(error => {
            console.log("Failed to fetch disasters:" + error)
        });



    return disasters
}