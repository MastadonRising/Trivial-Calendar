//Event Listeners
$(document).ready(function() {
    $(".dropdown-trigger").dropdown();
    $('a').on("click", function(event) {
        if ($(event.target).hasClass("monthDropDowns")) {
                month = event.target.id;
                generateCalendarByMonth(month ,year);
                $('#monthDropdown').text(convertMonth(event.target.id));
            }
        if ($(event.target).hasClass("yearDropDowns")) {
                year = event.target.id;
                generateCalendarByMonth(month , year);
                $('#yearDropdown').text(event.target.id);
        }
    })

});

//runs on start
var currentDate = new Date();
var month = ((currentDate.getMonth().length+1) === 1)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
var year = currentDate.getFullYear();
$('#monthDropdown').text(convertMonth(month));
generateCalendarGrid(month, year);
var city, region, country, weatherURL;
var APIKey = "cbe32bb3b579dad365829cdc5ba21e51";
locationLookup();
setTimeout(createWeatherURL, 1000);
setTimeout(getWeather, 2000);
var clock = setInterval(setTime, 1000);
generateYearDropdown(year);











function generateYearDropdown(currentYear) {
    year = parseInt(currentYear);
    numOfYears = 1; //this is the number of years before and after
    yearDropdown = $("#yearDD"); //this is the dropdown we want to add to
    $("#yearDropdown").text(currentYear);

    for (var i = currentYear - numOfYears; i < currentYear + numOfYears + 1; i++)
    {
        yearInsert = $("<li>");
        yearText = $("<a>");
        yearText.addClass("yearDropDowns");
        yearText.text(i);
        yearText.attr("id", i);
        yearInsert.appendTo(yearDropdown);
        yearText.appendTo(yearInsert);
    }


}

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
    for (var j = 1; j < 6; j++) {
        for (var k = 0; k < 7; k++) {
            if (firstRun && (day != '6')) {k = day + 1; firstRun = false;}
            if (dayCounter == numOfDays + 1) {return;}
            var temp = (j + "." + k);
            var container = document.getElementById(temp);
            container.textContent = (dayCounter);
            dayCounter++;
        }

    }
}

function generateCalendarGrid(month, year) {
    var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //this creates the first row to store days of the week
    var firstRow = $('<div>').attr('class', 'row');
    $('#calendarHolder').append(firstRow);
    //this will actually generate the days of the week in the top row
<<<<<<< HEAD
    for (var i = 0; i < 7; i++){
        var firstCol = $('<div>').attr('class', 'col s1 push-s2 daysOfWeek');
=======

    for (var i = 0; i < 7; i++){
        var firstCol = $('<div>').attr('class', 'col s1 push-s2 daysOfWeek');
   
>>>>>>> f2e220187201e211acc06965e09e9badaa409098
        firstCol.text(daysOfTheWeek[i]);
        firstRow.append(firstCol);
    }
    for (var i = 0; i < 6; i++) {
        var row = $('<div>').attr('class', 'row');
        $('#calendarHolder').append(row);
        for (var j = 0; j < 7; j++) {
            var col = $('<div>').attr('id', ("c" + (i + 1) + "." + (j)));
            col.addClass(convertMonth(month));
            col.addClass("col s1 push-s2 dayBox");
            row.append(col);
            var span = $('<span>').attr('class', 'flow-text');
            span.attr("id", (i + 1) + "." + (j));
            col.append(span);

        }
    }
    generateCalendarByMonth(month, year);
}

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
    var testcontent = $('</p>').text('hello worbl')
    var modalcontent = $('<div>').addClass('modal-content').append(testcontent)
    var closebutton = $('<a>').addClass('modal-close btn blue').text('close')
    var modalfooter = $('<div>').addClass('modal-footer').append(closebutton)
    modal.append(modalcontent).append(modalfooter)
    $('body').append(modal)


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
        var title = $('<h1>').text('Weather');
        var humidity = $('<p>').text('Humidity: ' + response.main.humidity);
        var wind = $('<p>').text('Wind: ' + response.wind.speed);
        var temp = $('<p>').text('temp: ' + response.main.temp);

        var conditions = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');

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
    $('#clock').text(currentTimeString);
}