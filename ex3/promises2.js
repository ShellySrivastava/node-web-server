const request = require('request');

let geocodeAddress = (address) => {
    let encodedAddress = encodeURIComponent(address);
    return new Promise ( (resolve, reject) => {
        request({
            uri: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBTkITpLc6zXMHBt4bDZTEWH_dfGW3KWmM`,
            json: true
            },
            (error, body, response) => {
                console.log(JSON.stringify(body, undefined, 2));
              if (body.status === 'OK') {
                  resolve({
                      address: response.results[0].formatted_address,
                      lat: response.results[0].geometry.location.lat,
                      lng: response.results[0].geometry.location.lng
                  });
              } else if (body.status === 'ZERO_RESULTS') {
                  reject("Address not found :( ");
              } else {
                  reject("server not found !!");
              }
          });
    });
}

geocodeAddress('560092').then( (location) => {
    console.log(location);
}, (errorMessage) => {
    console.log(errorMessage);
});