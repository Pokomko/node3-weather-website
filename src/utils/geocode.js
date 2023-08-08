const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3ltcGhvbmljb254ZCIsImEiOiJjbGsyZzN2eGowbnYyM2RwMWN0czFpcGFkIn0.j45phZweX8WJWpx4nCUDWA&limit=1';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding services', undefined);
        } else if (body.features.length === 0) {
            callback('No matches found. Try another search');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name,
                fastCoords: body.features[0].center[1] + ' ' + body.features[0].center[0],
            });
        }
    });
}

module.exports = geocode