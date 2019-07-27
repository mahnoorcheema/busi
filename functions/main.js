require('dotenv').config()
const fetch = require("node-fetch");
const URLSearchParams = require('@ungap/url-search-params')

// const stopNumber = document.getElementById('stopNumber').value;

const getSummaryForStop = async (stopNumber) => {
    const params = new URLSearchParams();
    params.append('appID', process.env.OCTRANSPO_APP_ID);
    params.append('apiKey', process.env.OCTRANSPO_API_KEY);
    params.append('stopNo', stopNumber);
    params.append('format', "JSON");

    const url = `https://api.octranspo1.com/v1.3/GetRouteSummaryForStop?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok){
        throw new Error(`Failed to get summary ${await response.text()}`);
    }
    return response.json();
}

const getNextTripsForStop = async(stopNumber) => {
    const params = new URLSearchParams();
    params.append('appID', process.env.OCTRANSPO_APP_ID);
    params.append('apiKey', process.env.OCTRANSPO_API_KEY);
    params.append('stopNo', stopNumber);
    params.append('format', "JSON");

    const url = `https://api.octranspo1.com/v1.3/GetNextTripsForStopAllRoutes?${params.toString()}`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Failed to get next trips ${response.status}`);
    }
    return response.json();
}

// const submitButton = document.getElementById("submit");
// submitButton.addEventListener('click', getNextTripsForStop);

function asyncHelper(promise) {
    promise
    .then(obj => console.log(JSON.stringify(obj, null, 2)))
    .catch(console.error);
}

asyncHelper(getNextTripsForStop(3000));