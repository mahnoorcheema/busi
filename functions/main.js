require('dotenv').config()
const fetch = require("node-fetch");
const URLSearchParams = require('@ungap/url-search-params')

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

exports.handler = async function({queryStringParameters}, context, callback) {
    const {stopNo} = queryStringParameters;
    if (!stopNo) {
        console.error("No stopNo provided");
        return callback(new Error("No stopNo"));
    }
    try {
        console.log("Fetching next trips for", stopNo);
        const result = await getNextTripsForStop(stopNo);
        console.log("Got Trips:", result);
        return callback(null, {statusCode: 200, body: JSON.stringify(result)});
    } catch (error) {
        console.error("Failed with error", error);
        return callback(error);
    }
}