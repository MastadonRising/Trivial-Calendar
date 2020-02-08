//initial variables
var weatherURL
var city
var region
var country
var APIKey = "cbe32bb3b579dad365829cdc5ba21e51";

//creates weatherurl with city/region/country pulled from ipapi api
function createWeatherURL() {
    weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + region + "," + country + "&units=imperial&appid=" + APIKey;
}

//pulls weather info for current location from openweather api
function getWeather() {
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {


        console.log(response)

        var title = $('<h1>').text('Weather')
        var humidity = $('<p>').text('Humidity: ' + response.main.humidity)
        var wind = $('<p>').text('Wind: ' + response.wind.speed)



        var temp = $('<p>').text('temp: ' + response.main.temp)

        $('body').append(title, temp, wind, humidity)

    });
}
//pulls user information to be used for weather api call.
function locationLookup() {
    queryURL = 'https://ipapi.co/json/'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        city = response.city
        region = response.region_code
        country = response.country_code
        console.log(city + region + country)
        createWeatherURL()
        getWeather()
    });
}


locationLookup()