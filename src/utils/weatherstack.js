const request = require('request');

const weather = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a428c6d1d6253113597fdf3d5839d907&query=' + latitude + ',' + longtitude + '&units=m'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.feelslike + ' degress feelslike.')
            };
        }    
    );
}

module.exports = weather

