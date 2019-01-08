const request = require('request');
const constants = require('./constants');

let baseURL = constants.mapsBaseURL;
let key = constants.mapsKey;

//wrapper func
  let getEncodedAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    request({
        uri: `${baseURL}address=${encodedAddress}&key=${key}`,
        json: true
        },
        (error, body, response) => {
          if (response.status === 'OK') {
              callback({
                  address: response.results[0].formatted_address,
                  lat: response.results[0].geometry.location.lat,
                  lng: response.results[0].geometry.location.lng
              });
          } else if (response.status === 'ZERO_RESULTS') {
              callback("Address not found :( ");
          } else {
              callback("server not found !!");
          }
      });
  }

  module.exports = {
    getEncodedAddress
  }