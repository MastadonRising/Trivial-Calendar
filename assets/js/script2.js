var weatherURL

var APIKey = "cbe32bb3b579dad365829cdc5ba21e51";

//creates weatherurl with city/region/country pulled from ipapi api
function createWeatherURL() {
    weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=davis,ca,us&units=imperial&appid=" + APIKey;
}
//api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={your api key}
//pulls weather info for current location from openweather api
function getWeather() {
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {


        console.log(response)



    });
}
getWeather()
    //pulls user information to be used for weather api call.