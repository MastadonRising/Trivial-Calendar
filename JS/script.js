$( document ).ready(function() {
    $(".dropdown-trigger").dropdown();
}) 

//runs on start
var date = new Date();
var initialmonth = ((date.getMonth().length+1) === 1)? (date.getMonth()+1) : '0' + (date.getMonth()+1);
$('#monthDropdown').text(convertMonth(initialmonth));
generateCalendarAtStart(convertMonth(initialmonth));











function generateCalendarAtStart(month) {
    var daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //this creates the first row to store days of the week
    var firstRow = $('<div>').attr('class', 'row');
    $('#calendarHolder').append(firstRow);
    //this will actually generate the days of the week in the top row
    for (var i = 0; i < 7; i++){
        var firstCol = $('<div>').attr('class', 'col s1 daysOfWeek');
        firstCol.text(daysOfTheWeek[i]);
        firstRow.append(firstCol);
    }
    for (var i = 0; i < 5; i++) 
    {
        var row = $('<div>').attr('class', 'row');
        $('#calendarHolder').append(row);
        for (var j = 0; j < 7; j++)
        {
            var col = $('<div>').attr('id', ((i+1) + "." + (j+1)));
            col.addClass(month);
            col.addClass("col s1 dayBox");
            row.append(col);
            var span = $('<span>').attr('class', 'flow-text');
            span.text(col.attr('id'));
            col.append(span);

        }
    }
}

function convertMonth(month) {
    switch(month) {
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