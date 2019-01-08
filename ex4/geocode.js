const request = require('request');

const constants = require('./constants.js');

let baseURL = constants.mapsBaseURL;
let key = constants.mapsKey;

let getLatLng = (address) => {
    let encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            uri: `${baseURL}address=${encodedAddress}&key=${key}`,
            json: true
        }, (error, body, response) => {
            if (response.status === 'OK') {
                resolve({
                    address: response.results[0].formatted_address,
                    lat: response.results[0].geometry.location.lat,
                    lng: response.results[0].geometry.location.lng
                });
            } else if (response.status === 'ZERO_RESULTS') {
                reject("Address not found :( ");
            } else {
                reject("server not found !!");
            }
        });
    });   
}

module.exports = {
    getLatLng
}