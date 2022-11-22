const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname) //C:\Users\Adam McKay\Desktop\JS\node-course\web-server\src
// console.log(path.join(__dirname, '../public/index.html')) //C:\Users\Adam McKay\Desktop\JS\node-course\web-server\src\app.js

const app = express()
const port = process.env.PORT || 3000  //choose process.env.PORT if it exists, otherwise 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/' )
const partialsPath = path.join(__dirname, '../templates/partials/')

// Setup handlebars engine and handle bars location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Adam McKay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adam McKay'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Take it easy',
        title:'Help Page',
        name: 'Adam McKay'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            } else {
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            } 
        })
    })
    


    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is sunny',
    //     location: 'Philadelphia'
        
    // })
})

app.get('/products', (req, res)=> {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found', 
        name: 'Adam McKay'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Adam McKay'
    })
})

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)
})