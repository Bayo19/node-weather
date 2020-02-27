const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define Paths for Express config
const public = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup Handlebars and views location
app.set('view engine', 'hbs') //setting name and the setting
app.set('views', viewPath) // pointing to custom directory
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(public))


app.get('', function(req, res) {
    res.render('index', {
        title: 'Weather',
        name: 'Bayo'
    })
})

app.get('/about', function(req, res) {
    res.render('about', {
        title: 'About me',
        name: 'Bayo'
    })
})

app.get('/weather', function(req, res) {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, function(error, { latitude, longitude, Location } = {}) {
        if (error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, function(error, forecastData) {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecastData,
                location: Location,
                address: req.query.address,
            })
        })
    })

})


app.get('/help', function(req, res) {
    res.render('help', {
        helpMessage: 'Plz HALP',
        title: 'Help',
        name: 'Bayo Ade'
    })
})

app.get('/help/*', function(req, res) {
    res.render('help404', {
        name: 'Bayo Ade'
    })
})

app.get('*', function(req, res) {
    res.render('404', {
        name: 'Bayo Ade'
    })
})



app.listen(port, function() {
    console.log(`Server is up on port ${port}`)
})