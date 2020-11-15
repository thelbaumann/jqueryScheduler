# jQuery Work Schedule

This is a micro application is built to function as a daily planner for its user. Utilizing basic HTML and CSS for styling and static build, the functionality of this application is all powered by jQuery. I was given the basic html/css template of this project and required to write the jQuery, as well as pull in moment.js in order to bring this project to life. This project is currently deployed and can be viewed at [https://thelbaumann.github.io/jqueryScheduler/](https://thelbaumann.github.io/jqueryScheduler/).


## About The Project

This web application allows you to create a persisting daily schedule for yourself. It opens by featuring the current day, followed by a pseudo-table of time-blocks for the typical 9:00am-5:00pm work day. These time-blocks are color-coded based on whether that time period is past, current, or future. By clicking on the color-coded blocks next to a timestamp, you can enter an event for this time period. Then, by clicking the associated save button, the schedule then saves this event to local browser storage so that it will be there when you close/reopen the page or refresh the page later. Events can be edited at any time by simply changing the text in the block and re-saving, or deleted by taking out the text of a time-block and clicking the save button. 

This project works mainly through a value associated with each time-block row. This value of the "parent" of each row allows the jQuery to tie the associated textarea element and save buttons together without having to individually assign them each different id's or values for each time-block. This value also happens to be equal to an integer equivalent of the military hour it is associated with (i.e. 9, 15, 23, etc.). This allows easy comparison between the hour of the time-block and the current hour given to the application by moment.js. This comparison is then used to assign the time-blocks their proper colors, alerting the user to events that have passed, are currently happening, and will happen soon in the future. 

#### User Story
I was given the following user story to guide my development:

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

#### Acceptance Criteria
As a part of this project, I was also provided with the following standards that my project should meet:

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Walkthrough

### First Look at the Scheduler + Adding an Event to your Schedule
![image of setting event on scheduler](https://github.com/thelbaumann/jqueryScheduler/blob/main/Assets/set_event.png)

When you first load the scheduler, at the top of the page you will see the headings as well as the current day (which is supplied via moment.js). Below this begin the time-blocks, which are again color-coded to let you know where those fall in relation to the current time (past, present, future). This is done by running a function which pulls the current hour via moment.js. Each row (time-block) of the calendar also has a value attribute on its parent representing the associated time. This value is then pulled to a comparison with the moment.js hour value. Based on these three comparison equations, the background color of these time-blocks is set. Furthermore, this hour comparison function is set on an interval on page load, so that the colors will continue to update with the time, even if the user does not reload the page.

To add an event, the user simply clicks on the colored part of the time-block and begins to enter their desired text. Upon finishing, they click the associated save button. This triggers an on-click function. This function then finds the parent of the clicked save button, and finds the textarea element within that same parent element. This allows a much more concise code than having to add or match id's from buttons to textarea elements, and is much more scalable this way as well. This function does not require editing of id's or elements or values if anything changes on these elements. Once this function finds the texarea in the same row as the save button clicked, it pulls both the value of the textarea element (the event the user entered) as well as the value attribute of the parent container (which is an integer equal to the military time equivalent of that hour). Then, it begins an if statement.

### Updating vs. Adding Events
![image of updating event text on scheduler](https://github.com/thelbaumann/jqueryScheduler/blob/main/Assets/event_change.png)

IF the textarea element contains text when the save button is clicked, it begins a for loop. All events created are stored in a variable and local storage array. This for loop loops through the variable array and checks to see if an object with the same time value already exists. If you are attempting to save an event for 9am, it checks all existing events in the area to see if they are for 9am. If an event already exists in that area for the time-block, it replaces the event description with what you have just typed. It then returns. The function ends. This is so multiple events for the same time-block are not added or duplicated. If the for loop finds no matching events, it goes on to create a new one. Either way, if one is updated or added, the new variable array is then set to the local browser storage item to keep it updated.


### Removing events
![image of deleting event from scheduler](https://github.com/thelbaumann/jqueryScheduler/blob/main/Assets/remove_event.png)

ELSE if the textarea element is blank when the user hits the save button, it runs the same for loop to see if an event exists at the same time-block which was saved. If one was, the event is effectively removed from the variable array and the local storage array. If an event did not already exist, nothing happens. This is so a user can delete an event permanently by deleting the text and hitting save again.


## Installing/Dependencies
No prerequisites or browser modifications are needed to run the page online here.
If you wish to clone the project,

git clone git@github.com:thelbaumann/jqueryScheduler.git

## Credits
I consulted various sources to help me in this project.

First, I used a [Mozilla Developer Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) to help me with deleting an event if the user saves a blank textarea element. I used the splice technique found in this article within a for loop to create the functionality I desired.

Secondly, I used this [jQuery documentation on .find()](https://api.jquery.com/find/) to help me build a variable that would select a textarea element within the same parent as the save button being clicked.

Thirdly, I used this [Stack Overflow Thread](https://stackoverflow.com/questions/4387319/how-to-select-specific-form-element-in-jquery) to help me in building a jQuery selector for forms with a specific value coming from a variable.

## Authors
Laura Baumann (https://www.linkedin.com/in/laura-baumann-070338102/)

## License
This project is licensed under [MIT](LICENSE) - 2020 Laura Baumann
