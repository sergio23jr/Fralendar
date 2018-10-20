//Object which holds everyone's freetime
var freetime = {};
var userFreeTime = {};

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