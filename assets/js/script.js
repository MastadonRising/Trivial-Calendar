//The Mountain is the way

//initial variables
var weatherURL
var city
var region
var country
var APIKey = "cbe32bb3b579dad365829cdc5ba21e51";
var weatherForecast = []
    //creates weatherurl with city/region/country pulled from ipapi api
function createWeatherURL() {
    weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + region + "," + country + "&units=imperial&appid=" + APIKey
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

    })
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
    })
}


locationLookup()

function forecast() {
    queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=davis,ca,us&units=imperial&appid=cbe32bb3b579dad365829cdc5ba21e51'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var date = new Date(response.list[0].dt * 1000)
        console.log(date)
        for (let i = 0; i < 40; i += 8) {
            console.log(moment.unix(response.list[i].dt).format("MM/DD/YYYY"))
            weatherForecast.push({ date: response.list[i].dt, temp: response.list[i].main.temp, weather: response.list[i].weather[0].description })
        }
    })
}
forecast()
    //https://api.openweathermap.org/data/2.5/forecast?q=davis,ca,us&units=imperial&appid=cbe32bb3b579dad365829cdc5ba21e51

//modal
//create modal for page
function createModal() {

    var modal = $('<div>').addClass('modal').attr('id', 'modal1')
    var testcontent = $('</p>').text('hello worbl')
    var modalcontent = $('<div>').addClass('modal-content').append(testcontent)
    var closebutton = $('<a>').addClass('modal-close btn blue').text('close')
    var modalfooter = $('<div>').addClass('modal-footer').append(closebutton)
    modal.append(modalcontent).append(modalfooter)
    $('body').append(modal)


}
createModal()
    //listener to activate modal, modal trigger element have href='modal1' and class modal-trigger 
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal')
    var instances = M.Modal.init(elems)
})