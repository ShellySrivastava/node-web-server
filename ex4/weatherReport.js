const request = require('request');

const constants = require('./constants.js');

let baseURL = constants.forecastBaseURL;
let key = constants.forecastKey;

let getWeatherReport = (lat, lng) => {
    
    return new Promise((resolve, reject) => {
        request({
            uri: `${baseURL}${key}${lat},${lng}`,
            json: true
          },
          (error, body, Response) => {
            if(!error)
                resolve(Response.daily.summary);
            else
                reject("Weather Report can't be fetched");
          });
    });  
}

module.exports = {
    getWeatherReport
}
