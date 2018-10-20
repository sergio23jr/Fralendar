//Object which holds everyone's freetime
var freetime = {};
var userFreeTime = {};

// Array for getting current day and next 6 days
var daysOfWeek = [
    moment().format("dddd"),
    moment().add(1, "days").format("dddd"),
    moment().add(2, "days").format("dddd"),
    moment().add(3, "days").format("dddd"),
    moment().add(4, "days").format("dddd"),
    moment().add(5, "days").format("dddd"),
    moment().add(6, "days").format("dddd")
];

//array for getting current date and next 6 dates
var dayNum = [
    moment().date(),
    moment().add(1, "days").date(),
    moment().add(2, "days").date(),
    moment().add(3, "days").date(),
    moment().add(4, "days").date(),
    moment().add(5, "days").date(),
    moment().add(6, "days").date(),
];

// array for out button value names
var timeOfDay = ["Morning", "Afternoon", "Night"]

// console.log just to help me out figuring out formulas
console.log(moment().add(1, "days").format("dddd"));



// creating a div to append all days to (Sunday-Saturday)
var firstRowDiv = $("<div>")
firstRowDiv.attr({ "id": "calanderWeek" })
firstRowDiv.addClass("row")

// we have this slot because bootstrap requires 12 column slots (7 days * 1 slot each ) = 4 remaing slots
firstRowDiv.prepend(`<div class="week col-md-2">Your Fralendar</div>`);

// for loop to dynamically create the days along with any added attr
for (var i = 0; i < 7; i++) {
    var dayDiv = $("<div>")
    dayDiv.attr({ "id": daysOfWeek[i] })
    dayDiv.addClass(["week", "text-center", "col-md-1"])
    dayDiv.text(daysOfWeek[i])

    firstRowDiv.append(dayDiv);
}
// Same as outher div added above, we now have 12 column required per bootstrap
firstRowDiv.append(
    `<div class="week col-md-2">blank</div>`
)

// append this row to html doc
$(".calendarHTML").append(firstRowDiv);



// creating second row for our dates/buttons along with attr
var secondRowDiv = $("<div>")
secondRowDiv.attr({ "id": "secondRow" })
secondRowDiv.addClass(["row", "text-center"])

// With 4 slot remaing in columns this div will be used for calendar purposes
secondRowDiv.prepend(
    // Lines will dynamically give us 
    // "Month: "current Month"
    // Week: "Current Week"
    // Days: "First day of week/Last day of week"
    `<div class="day col-md-2"> Month: ${moment().month()} 
    <br> Week: ${moment().week()} 
    <br> Days: ${moment().startOf("week").date()}-${moment().endOf("week").date()}</div>`)

// Loop to dynamically create of dates
for (var j = 0; j < 7; j++) {

    var dayOfTheWeek = $("<div>");
    dayOfTheWeek.addClass(["day", "col-md-1"]);
    // this will dynamically give us text for current day + next 6 days
    dayOfTheWeek.text(dayNum[j]);

    //loop to generate the 3 buttons in our dates
    for (var k = 0; k < 3; k++) {
        var btn = $("<button>");
        btn.addClass(["btn", "btn-block", "calendar-btn"]);

        // Line will output
        // id : "Specific Day + Specific Time"
        // value: 0 initial starting value
        //still working on this line to dynamically give us unix time for each button
        btn.attr({
            "id": daysOfWeek[j] + timeOfDay[k],
            "value": 0,
            "data-moment": moment().format()
        });

        // will display the time of day (Morning, Afternoon, Night)
        btn.text(timeOfDay[k]);
        dayOfTheWeek.append(btn);

    }
    secondRowDiv.append(dayOfTheWeek);
}
// again extra 2 column can do whatever with this
secondRowDiv.append(`<div class="day col-md-2"></div>`)

//append to html doc
$(".calendarHTML").append(secondRowDiv);











// listener event for buttons 
$(".calendar-btn").on("click", function () {
    var value = $(this).val();
    // changes value on button to "1" signifying they are available
    if (value === "0" || value === "2") {
        $(this).val("1")
        $(this).removeClass("btn-danger")
        $(this).addClass("btn-success");
    }
    // changes value on button to "2" signifying they are unavailables
    if (value === "1") {
        $(this).val("2")
        $(this).removeClass("btn-success")
        $(this).addClass("btn-danger")
    }

});

//Gets the User Calendar when authstatechanges from the login page
function getUserCalendar() {
    firebase.database().ref(`/freetime/${user.ID}`).once("value").then(function (snap) {
        userFreeTime = {};
        console.log(snap.val())
        userFreeTime = snap.val();
    });
};

function addNewUserToCalendar() {
    userFreeTime = { "saturdayMorning": "0" }
    firebase.database().ref(`/freetime/${user.ID}`).set(userFreeTime);
};

//Adds a listener to freetime so when new freetime is selected it pulls to the object
firebase.database().ref("/freetime/").on("value", function (snap) {
    freetime = snap.val();
});

$(".calendar-btn").on("click", function () {
    //Pulls the value and the ID from each button to be used in firebase
    var buttonTime = $(this).val();
    var attribute = $(this).attr(`id`);
    freetime[user.ID] = {};
    userFreeTime[attribute] = buttonTime;
    freetime[user.ID] = userFreeTime;
    firebase.database().ref(`/freetime/`).set(freetime);
});