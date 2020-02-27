const request = require('request')

const forecast = (lat, lon, callback) => {

    url = `https://api.darksky.net/forecast/c74a15c8bfe81a6a8a5a50e811fe2297/${lat},${lon}`

    request({ url, json: true }, function(err, { body }) {

        let currently = body.currently;
        let daySum = currently.summary;

        if (err) {
            callback('Unable to connect to weather services right now', undefined)
        } else if (body.err) {
            callback('Unable to find that location', undefined)
        } else {
            callback(undefined, {
                Summary: `${daySum}, with a windspeed of ${currently.windSpeed} kmph. It'\s about ${currently.apparentTemperature.toFixed(0)} degrees farenheit and there is a ${currently.precipProbability}% chance of rain.`,
            })
        }
    })
}

module.exports = forecast