const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
          .option({
              a: {
                describe: '',
                demand: true,
                alias: 'address',
                string: true
              }
            })
          .help()
          .alias('help', 'h')
          .argv;

let encodedAddress = encodeURIComponent(argv.a);

let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBTkITpLc6zXMHBt4bDZTEWH_dfGW3KWmM`;
// console.log(geocodeURL);
axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address');
    }
    // console.log(JSON.stringify(response.data, undefined, 2));
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherURL = `https://api.darksky.net/forecast/83ba89c3078ff2be3c5a976107cecc70/${lat},${lng}`;
    console.log(weatherURL);
     return axios.get(weatherURL);
}).then((response) => {
    // console.log(response);
    console.log(response.data.currently.temperature);
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('unable to find server');
    } else {
        console.log(error.message);
    }
});