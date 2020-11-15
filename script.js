

// variables

var eventsArray = [];

var todayDay = moment().format("dddd, MMMM Do");

var descriptions = $(".description")

console.log(moment().format("H"));


// functions

    // function to run on page load

$(document).ready(function() {

    // set var events array equal to the local storage array

    eventsArray = JSON.parse(localStorage.getItem("scheduledEvents") || "[]");

    // loop through var events array and display events in timeblocks that should have them

    for (i=0; i<eventsArray.length; i++) {
        var timeValue = eventsArray[i].time;
        $("form[value=" + timeValue + "]").find("textarea").val(eventsArray[i].event);
    }

    // set the heading to today's date

    $("#currentDay").text(todayDay);

    // give the hour function an interval so that it will continue to update colors even without page load

    setInterval(isBeforeAfter(),10000);
    
});


function isBeforeAfter() {

    // get current hour from moment.js

    // var todayHour = moment().format("H");

    // todayHour = parseInt(todayHour);

    var todayHour = 11;

    // loop through all textareas and set their background color according to whether their parent value falls 
        // less than, equal to, or greater than the current hour as told by moment.js

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



// on click event for all buttons with class .saveBtn

$(".saveBtn").click(function(event) {

    event.preventDefault();

    // for the save button clicked, find the textarea in the same form and pull the value, get the 
        //value attribute from the parent div

    var description = $(this).parent().find("textarea").val();
    var time = $(this).parent().attr("value");
    time = parseInt(time);
    

    // if the user entered text before they clicked save, run this function

    if ($(this).parent().find("textarea").val() !== "") {

        // loop through the array to find out if an event in that time block already exists
            // if it does, replace the event description with the new one, and break out of this function

        for (i=0; i<eventsArray.length; i++) {

            if (eventsArray[i].time == time) {
                eventsArray[i].event = description;
                localStorage.setItem("scheduledEvents", JSON.stringify(eventsArray));
                return;
            }
        
        }

        // if no event exists in the array with that current time block, add a new array object

            var scheduleEntry = {
                event: description, 
                time: time
            }

            eventsArray.push(scheduleEntry);

            localStorage.setItem("scheduledEvents", JSON.stringify(eventsArray));

    
    }

    // if the user clicked save after entering no text or deleting previously existing text

    else {

        // loop through the array to find out if an event in that time block already exists
            // if it does, and there was no text entered by the user, delete the event from the array.

        for (i=0; i<eventsArray.length; i++) {

            if (eventsArray[i].time == time) {
                var removed = eventsArray.splice(i, 1);
                localStorage.setItem("scheduledEvents", JSON.stringify(eventsArray));
                return;
            }
        
        }

    
    }

});