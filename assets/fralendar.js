//Object which holds everyone's freetime
var freetime = {};
var userFreetime = {};

// listener event for buttons 
$(".btn").on("click", function () {
    var value = $(this).val();
    console.log(value)
    // changes value on button to "1" signifying they are available
    if (value === "0" || value === "2") {
        $(this).val("1")
        $(this).removeClass("btn-danger")
        $(this).addClass("btn-success");
        console.log(value)
    }
    // changes value on button to "2" signifying they are unavailables
    if (value === "1") {
        $(this).val("2")
        $(this).removeClass("btn-success")
        $(this).addClass("btn-danger")
        console.log(value)
    }

});

//Gets the User Calendar when authstatechanges from the login page
function getUserCalendar() {
    firebase.database().ref(`/freetime/${user.ID}`).once("value").then(function (snap) {
        console.log(snap.val())
        userFreetime = snap.val();
    });
}

//Adds a listener to freetime so when new freetime is selected it pulls to the object
firebase.database().ref("/freetime/").on("value", function (snap) {
    freetime = snap.val();
});

$(".calendar-btn").on("click", function () {
    //Pulls the value and the ID from each button to be used in firebase
    var buttonTime = $(this).val();
    var attribute = $(this).attr(`id`);
    userFreetime[attribute] = buttonTime;
    freetime[user.ID] = userFreetime;
    firebase.database().ref(`/freetime/`).set(freetime);
});