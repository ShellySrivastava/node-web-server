const yargs = require('yargs');

const geocode = require('./geocode.js');
const weatherReport = require('./weatherReport');

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
//return and skip catch
geocode.getLatLng(argv.a).then((location) => {
    weatherReport.getWeatherReport(location.lat, location.lng)
        .then((weatherSummary) => {
            console.log(`\n\nThe weather report for ${location.address} :\n${weatherSummary}\n\n`)
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });
}).catch((errorMessage) => {
    console.log(errorMessage);
});