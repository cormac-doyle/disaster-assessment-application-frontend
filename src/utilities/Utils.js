// Get disasters
export default async function fetchDisasters() {




    const requestOptions = {
        method: "get",
        headers: {
            "Content-type": "application/json",
        }
    };

    const disasters = await fetch("https://ase-backend-2.herokuapp.com/api/1/disasters-civ/", requestOptions)
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