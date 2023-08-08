const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weatherstack');

const app = express();

// Define paths for Express
const publicDirPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Max Kiselyov',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Max Kiselyov',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        contactInfo: 'Contact info: ',
        helpInfo: 'Contact if you have some issues',
        name: 'Max Kiselyov',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!',
        });
    };
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
    
        weather(latitude, longtitude, (error, weatherdata) => {
            if (error) {
                return res.send({error})
            };
            res.send({
                forecast: weatherdata,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term',
        })
    };
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Max Kiselyov',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not exist',
        name: 'Max Kiselyov',
    });
});



app.listen(3000, () => {
    console.log('Starting server on port 3000');
});
