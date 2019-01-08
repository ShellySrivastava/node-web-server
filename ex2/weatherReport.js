const request = require('request');
const constants = require('./constants');

let baseURI = constants.forecastBaseURI;
let key = constants.forecastKey;

//if status is not there, check for error
let getWeatherReport = (lat, lng, callback) => {
    request({
        uri: `${baseURI}${key}${lat},${lng}`,
        json: true
      },
      (error, body, Response) => {
        callback(Response.daily.summary);
      });
  }

module.exports = {
    getWeatherReport
  }