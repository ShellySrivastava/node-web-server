const yargs = require('yargs');
const geocode = require('./geocode');
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

geocode.getEncodedAddress(argv.a, (mapsMessage) => {
    console.log(mapsMessage);
    if (typeof(mapsMessage) === 'object') {
      weatherReport.getWeatherReport(mapsMessage.lat, mapsMessage.lng, (weatherMessage) => {
        console.log(weatherMessage);
      });
    }
  });

 


