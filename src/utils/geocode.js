const request = require('request')


const geocode = (address, callback) => {

    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGVzaHN0ZWVuaG9mZm1hbiIsImEiOiJjazZmNnJjODExcnAwM2VtZ3ZlOW5ibnNnIn0.McPIsBFCBtUflBOzVkH_dQ&limit=1'

    request({ url, json: true }, function(err, { body }) {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                Location: body.features[0].place_name,
            })

        }
    })
}

module.exports = geocode