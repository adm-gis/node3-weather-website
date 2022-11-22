const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9e9ad2dbe26059db171488ab7472553d&query='+ latitude+ ','+ longitude+'&units=m'

    request({url, json:true}, (error, {body})=> {
        if (error) {
            callback('Unable to connect to weather api')
        } else if (body.error) {
            callback('Cannot access weather info for this location', url)
        } else {
            callback(undefined, {
                'description':"The forecast for today is: " + body.current.weather_descriptions[0] + ' with a temperature of ' + body.current.temperature + ' , feeling like ' + body.current.feelslike,
                'temperature':body.current.temperature,
                'feels_like':body.current.feelslike,
                url
            })
        }
    })
}

// const url = 'http://api.weatherstack.com/current?access_key=9e9ad2dbe26059db171488ab7472553d&query=37.8267,-122.4233&units=f'


module.exports = forecast