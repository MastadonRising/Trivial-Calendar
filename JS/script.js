//Event Listeners
$(document).ready(function() {
    $(window).resize(function() { //this will run when the window gets resized and will check to see how big the display is
        var weekdays = document.querySelectorAll(".daysOfWeek");
        var x = window.matchMedia("(max-width: 700px)");
        var y = window.matchMedia("(min-width: 1100px)");

        if (y.matches) {
            var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        } else if (x.matches) {
            var daysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else {
            var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        }
        for (var i = 0; i < 7; i++) {
            weekdays[i].textContent = daysOfTheWeek[i];
        }
    });
    $("#modal1").modal();
    $(".dropdown-trigger").dropdown();
    $('a').on("click", function(event) {
        if ($(event.target).hasClass("monthDropDowns")) {
            month = event.target.id;
            generateCalendarByMonth(month, year);
            $('#monthDropdown').text(convertMonth(event.target.id));
        }
        if ($(event.target).hasClass("yearDropDowns")) {
            year = event.target.id;
            generateCalendarByMonth(month, year);
            $('#yearDropdown').text(event.target.id);
        }
    })

});
// brings up the modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal')
    var instances = M.Modal.init(elems)
})




//runs on start
var currentDate = new Date(); //stores current date
var day = ''// Day currently selected 
var month = ((currentDate.getMonth().length + 1) === 1) ? (currentDate.getMonth() + 1) : '0' + (currentDate.getMonth() + 1); //inital set for the month
var year = currentDate.getFullYear(); //sets inital year
var activeDate = '' //currently selected date for display 
$('#monthDropdown').text(convertMonth(month)); //changes dropdown to inital month
generateCalendarGrid(month, year);
var city, region, country, weatherURL, forecastURL, lat, lon
var weatherForecast = []
var APIKey = "cbe32bb3b579dad365829cdc5ba21e51";

locationLookup();
var clock = setInterval(setTime, 1000);
generateYearDropdown(year);
createModal();

$(document).on("click", ".modal-trigger", function(e) {
    $('#weather').empty()
    var weatherdata = false
    var day = this.textContent
    var date = moment(month + "/" + day + "/" + year + "12:00", "M/D/YYYY H:mm").unix()
    var activeDate = moment(month + "/" + day + "/" + year + "12:00", "M/D/YYYY H:mm").format('MM-DD-YYYY')
    $('.dateDisplay').text(activeDate)
    $('#weather').empty();
    var weatherdata = false;
    var day = this.textContent;

    if (moment().format('DD') == day) {
        var temp = $('<li>').text($('#temp').text());
        var humidity = $('<li>').text($('#humidity').text());
        $('#weather').append(temp).append(humidity);
        weatherdata = true;
    }
    for (let i = 0; i < weatherForecast.length; i++) {

        if (weatherForecast[i].date === day && weatherForecast[i].month == month ) {

            var temp = $('<li>').text(weatherForecast[i].temp);
            var humidity = $('<li>').text(weatherForecast[i].humidity);
            $('#weather').append(temp).append(humidity);
            weatherdata = true;
        }

    }
    if (day < moment().format('DD')) {
        getHistoricalWeather(date)

        weatherdata = true
    }
    if (weatherdata === false) {
        var noData = $('<li>').text('No weather information available for this day');
        $('#weather').append(noData)
    }
    generateFunFacts(month, day, 'date');


})

function generateYearDropdown(currentYear) {
    year = parseInt(currentYear);
    numOfYears = 1; //this is the number of years before and after
    yearDropdown = $("#yearDD"); //this is the dropdown we want to add to
    $("#yearDropdown").text(currentYear);

    for (var i = currentYear - numOfYears; i < currentYear + numOfYears + 1; i++) {
        yearInsert = $("<li>");
        yearText = $("<a>");
        yearText.addClass("yearDropDowns");
        yearText.text(i);
        yearText.attr("id", i);
        yearInsert.appendTo(yearDropdown);
        yearText.appendTo(yearInsert);
    }
}
//generates the calendar days based on month and year
function generateCalendarByMonth(month, year) {
    //Removes all prev text in calendar
    for (var z = 1; z < 6; z++) {
        for (var y = 0; y < 7; y++) {
            var tmp = (z + "." + y);
            var cont = document.getElementById(tmp);
            cont.innerHTML = ("");
        }
    }
    var day = new Date(year + "-" + month + "-01").getDay();
    var dayCounter = 1;
    var numOfDays = new Date(year, month, '0').getDate();
    var firstRun = true;
    var remover = document.querySelectorAll('.dayBox');
    for (i = 0; i < remover.length; i++) {
        remover[i].classList.remove('dayBox');
    };
    for (var j = 1; j < 6; j++) {
        for (var k = 0; k < 7; k++) {
            if (firstRun && (day != '6')) {
                k = day + 1;
                firstRun = false;
            }
            if (dayCounter == numOfDays + 1) { return; }
            var temp = (j + "." + k);
            var container = document.getElementById(temp);
            // var dayBox = document.get
            container.textContent = (dayCounter);
             container.parentElement.classList.add('dayBox');
             current();
            dayCounter++;
        }

    }
}

function generateCalendarGrid(month, year) {
    var x = window.matchMedia("(max-width: 700px)");
    var y = window.matchMedia("(min-width: 1100px)");

    if (y.matches) {
        var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    } else if (x.matches) {
        var daysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    } else {
        var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
    //this creates the first row to store days of the week
    var firstRow = $('<div>').attr('class', 'row');
    $('#calendarHolder').append(firstRow);
    //this will actually generate the days of the week in the top row
    for (var i = 0; i < 7; i++) {
        var firstCol = $('<div>').attr('class', 'col s1 push-s2 daysOfWeek');
        firstCol.text(daysOfTheWeek[i]);
        firstRow.append(firstCol);
    }
    for (var i = 0; i < 6; i++) {
        var row = $('<div>').attr('class', 'row');
        $('#calendarHolder').append(row);
        for (var j = 0; j < 7; j++) {
            var col = $('<div>').attr('id', ("c" + (i + 1) + "." + (j)));
            col.addClass(convertMonth(month));
            col.addClass("col s1 push-s2  modal-trigger");
            col.attr("href", "#modal1");
            row.append(col);
            var span = $('<span>').attr('class', 'flow-text');
            span.attr("id", (i + 1) + "." + (j));
            col.append(span);

        }
    }
    generateCalendarByMonth(month, year);
}
//turns 2 number month to a string month
function convertMonth(month) {
    switch (month) {
        case '01':
            return ("January");
            break;
        case '02':
            return ("February");
            break;
        case '03':
            return ("March");
            break;
        case '04':
            return ("April");
            break;
        case '05':
            return ("May");
            break;
        case '06':
            return ("June");
            break;
        case '07':
            return ("July");
            break;
        case '08':
            return ("August");
            break;
        case '09':
            return ("September");
            break;
        case '10':
            return ("October");
            break;
        case '11':
            return ("November");
            break;
        case '12':
            return ("December");
            break;
    }
}

//created modal to attach to page
function createModal() {
    
    var modal = $('<div>').addClass('modal').attr('id', 'modal1')
        var ModalHeader = $('<nav class="nav-wrapper"><div class= " mHeader col s10 m10 l10"><h4 class="dateDisplay"></h4><span class="clock right">')
    var weather = $('<ul>').attr('id', 'weather')
    var ModalWeather = $('<div class="row">').append(weather)
    var modalFunFact = $('<div class="row" id="fun">').text('Fun Fun Fun')
    var modalcontent = $('<div>').addClass('modal-content').append(ModalHeader).append(ModalWeather).append(modalFunFact)
    var closebutton = $('<a>').addClass('modal-close btn blue v-align').text('close')
    var prevDay = $('<i>').addClass('fas fa-arrow-circle-left fa-2x').attr('id','left')
    var nextDay = $('<i class="fas fa-arrow-circle-right fa-2x"></i>').attr('id','right')
    var modalfooter = $('<div class="footer-copyright modal-fixed-footer center-align">').addClass('page-footer')
        .append(prevDay)
        .append(closebutton)
        .append(nextDay);    
    modal.append(modalcontent)
        .append(modalfooter); 
    $('body').append(modal)
}

//pulls user information to be used for weather api call.
function locationLookup() {
    queryURL = 'https://ipapi.co/json/';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        city = response.city;
        region = response.region_code;
        country = response.country_code;
        createWeatherURL();
        getWeather();
    })
}

//create weather URL
function createWeatherURL() {
    weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + region + "," + country + "&units=imperial&appid=" + APIKey
}

//function to pull and display current weather
function getWeather() {
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        var temp = response.main.temp;
        lat = response.coord.lat
        lon = response.coord.lon

        var conditions = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
        $('#location').text('City: ' + city).addClass('padded');
        $('#temp').text('Temperature: ' + temp).addClass('padded');
        $('#humidity').text('Humidity: ' + humidity).addClass('padded');
        createForecastURL();
        getForecast();
    })
}

function createForecastURL() {
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + region + "," + country + "&units=imperial&appid=" + APIKey
}

function getForecast() {

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response) {

        //create an array of objects that contain weather data
        for (let i = 7; i < 40; i += 8) {
            weatherForecast.push({
                date: moment.unix(response.list[i].dt).format("DD"),
                month: moment.unix(response.list[i].dt).format("MM"),
                temp: "Temperature: " + response.list[i].main.temp,
                humidity: "Humidity: " + response.list[i].main.humidity,
                wind: 'Wind Speed:' + response.list[i].wind.speed,
                conditions: 'https://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '.png'

            })
        }
    })
}


function setTime() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours == 0) ? 12 : currentHours;

    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
    $('.clock').text(currentTimeString);
}
//number is either the day 
function generateFunFacts(month, day, type) {

    if (type == 'date') {
        funfactURL = 'https://numbersapi.p.rapidapi.com/' + month + '/' + day + '/date' + "?fragment=true&json=true";
    }
    if (type == 'number') {
        funfactURL = 'https://numbersapi.p.rapidapi.com/' + day + '/math' + "?fragment=true&json=true";
    }
    if (type == 'trivia') {
        funfactURL = 'https://numbersapi.p.rapidapi.com/' + day + '/trivia' + "?fragment=true&json=true";
    }
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": funfactURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
            "x-rapidapi-key": "bdf8af4ec5mshd6215e1f3a50463p1586f2jsn4b1f7c7d1157"
        }
    }

    $.ajax(settings).then(function(response) {

        $('#fun').text(response.text)

    })
}

function getHistoricalWeather(date) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://dark-sky.p.rapidapi.com/" + lat + "," + lon + "," + date + "?lang=en&units=auto",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key": "7c9c594624mshd9e6fe716b20cc9p14d369jsna546b1439557"
        }
    }
        
    $.ajax(settings).done(function(response) {
        var temp = $('<li>').text('Temperature: ' + response.hourly.data[4].temperature)
        var humidity = $('<li>').text('Temperature: ' + response.hourly.data[4].humidity)
        $('#weather').append(temp).append(humidity);

    })
};

function current(){
    var dayboxes = document.querySelectorAll('.dayBox')
    for (i=0; i< dayboxes.length; i++){
        if( dayboxes[i].firstChild.innerHTML == moment(currentDate).date() && currentDate.getMonth()+1 == month  ){
            dayboxes[i].classList.add('currentDay')
        }else {
            dayboxes[i].classList.remove('currentDay')          
}      
    }
}

// // Navigation
var left = document.getElementById('left');
 left.addEventListener('click', function() {
   
    $('#weather').empty()
    var weatherdata = false
    var day= moment($('.dateDisplay').text())
    var newDate = day.subtract(1,'days')
    var date= newDate.unix()
    $('.dateDisplay').text(newDate.format('MM-DD-YYYY'))
    
    $('#weather').empty();
    var weatherdata = false;
    
    if (moment().format('MM-DD-YYYY') == newDate.format('MM-DD-YYYY')) {
        var temp = $('<li>').text($('#temp').text());
        var humidity = $('<li>').text($('#humidity').text());
        $('#weather').append(temp).append(humidity);
        weatherdata = true;
    }
    for (let i = 0; i < weatherForecast.length; i++) {

        if (weatherForecast[i].date === newDate.format('DD')  && weatherForecast[i].month === month) {

            var temp = $('<li>').text(weatherForecast[i].temp);
            var humidity = $('<li>').text(weatherForecast[i].humidity);
            $('#weather').append(temp).append(humidity);
            weatherdata = true;
        }

    }
    if (newDate.format('MM-DD-YYYY') < moment().format('MM-DD-YYYY')) {
        getHistoricalWeather(date)

        weatherdata = true
    }
    if (weatherdata === false) {
        var noData = $('<li>').text('No weather information available for this day');
        $('#weather').append(noData)
    }
    generateFunFacts(month, newDate.format('DD'), 'date');
}); 
var right = document.getElementById('right')
right.addEventListener('click', function(){
    $('#weather').empty()
    var weatherdata = false
    var day= moment($('.dateDisplay').text())
    var newDate = day.add(1,'days')
    var date= newDate.unix()
    $('.dateDisplay').text(newDate.format('MM-DD-YYYY'))
    
    $('#weather').empty();
    var weatherdata = false;
    
    if (moment().format('MM-DD-YYYY') == newDate.format('MM-DD-YYYY')) {
        var temp = $('<li>').text($('#temp').text());
        var humidity = $('<li>').text($('#humidity').text());
        $('#weather').append(temp).append(humidity);
        weatherdata = true;
    }
    for (let i = 0; i < weatherForecast.length; i++) {

        if (weatherForecast[i].date === newDate.format('DD') && weatherForecast[i].month === month ) {

            var temp = $('<li>').text(weatherForecast[i].temp);
            var humidity = $('<li>').text(weatherForecast[i].humidity);
            $('#weather').append(temp).append(humidity);
            weatherdata = true;
        }

    }
    if (newDate.format('MM-DD-YYYY') < moment().format('MM-DD-YYYY')) {
        getHistoricalWeather(date)

        weatherdata = true
    }
    if (weatherdata === false) {
        var noData = $('<li>').text('No weather information available for this day');
        $('#weather').append(noData)
    }
    generateFunFacts(month, newDate.format('DD'), 'date');
}); 