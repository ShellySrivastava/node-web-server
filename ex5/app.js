const yargs = require('yargs');
const axios = require('axios');

const constants = require('./constants.js');

let mapsBaseURL = constants.mapsBaseURL;
let mapsKey = constants.mapsKey;

let forecastBaseURL = constants.forecastBaseURL;
let forecastKey = constants.forecastKey;

let ipifyBaseURL = constants.ipifyBaseURL;
let ipLookupBaseURL = constants.ipLookupBaseURL;

const argv = yargs
          .option({
              a: {
                describe: '',
                alias: 'address',
                string: true
              }
            })
          .help()
          .alias('help', 'h')
          .argv;


if(argv.a){
    encodedAddress = encodeURIComponent(argv.a);
    let geocodeURL = `${mapsBaseURL}address=${encodedAddress}&key=${mapsKey}`;
    axios.get(geocodeURL).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find the address');
        }
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherURL = `${forecastBaseURL}${forecastKey}${lat},${lng}`;
        return axios.get(weatherURL);
    }).then((response) => {
        console.log(`\nWeather Report: ${response.data.daily.summary}\n`);
    }).catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('unable to find server');
        } else {
            console.log(error.message);
        }
    });
} else {
    console.log('Fetching your current address....');
    axios.get(`${ipifyBaseURL}`).then((response) => {
        return axios.get(`${ipLookupBaseURL}${response.data.ip}`);
    }).then((response) => {
        if(response.data.status === 'fail') {
            throw new Error('Unable to find current address');
        }
        console.log(`\nYou are currently in ${response.data.city}`);
        let lat = response.data.lat;
        let lng = response.data.lon;
        let weatherURL = `${forecastBaseURL}${forecastKey}${lat},${lng}`;
        return axios.get(weatherURL);
    }).then((response) => {
        console.log(`\nWeather Report: ${response.data.daily.summary}\n`);
    }).catch((error) => {
        console.log(error.message);
    });
}


