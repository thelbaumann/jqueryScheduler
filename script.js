

// var description = $(".description").val();

// var time = $(".row").attr("value").valueOf();

var events = [];

var todayDay = moment().format("dddd, MMMM Do");

var descriptions = $(".description")

console.log(moment().format("H"));




$(document).ready(function() {

    events = JSON.parse(localStorage.getItem("scheduledEvents") || "[]");

    for (i=0; i<events.length; i++) {
        var timeValue = events[i].time;
        console.log(timeValue);
        $("form[value=" + timeValue + "]").find("textarea").val(events[i].event);
    }

    $("#currentDay").text(todayDay);

    setInterval(isBeforeAfter(),10000);
    
});


function isBeforeAfter() {

    // var todayHour = moment().format("H");

    var todayHour = 11;

    console.log("this is the hour = " + todayHour);

    for (i=0; i<descriptions.length; i++) {    

        var currentDescription = $(descriptions[i]).parent().attr("value");

        console.log(currentDescription);

        if (currentDescription < todayHour) {
            $(descriptions[i]).css("background-color", "rgb(220,220,220)");
        }

        else if (currentDescription == todayHour) {
            $(descriptions[i]).css("background-color", "rgb(255,99,71)");
        }

        else if (currentDescription > todayHour) {
            $(descriptions[i]).css("background-color", "rgb(144,238,144)");
        }

    }
}

// localStorage.removeItem("scheduledEvents");


$(".saveBtn").click(function(event) {

    event.preventDefault();

    console.log(this);

    console.log($(this).parent());
    
    if ($(this).parent().find("textarea").val() != "") {

        // if (localStorage.getItem("event.") === null) {

        // }

        // else {

            var description = $(this).parent().find("textarea").val();
            var time = $(this).parent().attr("value");

            console.log(time);
            console.log(description);

            var scheduleEntry = {
                event: description, 
                time: time
            }

            console.log(scheduleEntry);

            events.push(scheduleEntry);

            localStorage.setItem("scheduledEvents", JSON.stringify(events));

        // }

        
    
    }

});