zip = 60614;
tmDateString = "2018-10-25T10:00:00Z";
tmDateString2 = "2018-10-31T23:59:59Z";
apiEvents = [];
// Api url - includes zip and date. date is set as a range to then get time of day we need to leverage the data in the pull.heroku allows us to bypass CORS permission
(tmUrl =
  "https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?"),
  (tmZip = zip),
  (tmKey = "apikey=aw1x9XltYOH5uHXUYANmxJszqWA77OZR"),
  (tmDateStart = tmDateString),
  (tmDateEnd = tmDateString2),
  (tmApiCall =
    tmUrl +
    tmKey +
    "&" +
    "postalCode=" +
    tmZip +
    "&" +
    "startDateTime=" +
    tmDateStart +
    "&" +
    "endDateTime=" +
    tmDateEnd);

//create an Ajax call
$.ajax({
  type: "GET",
  url: tmApiCall
}).then(function (response) {
  //log the queryURL
  console.log(response);

  apiEvents = response._embedded.events;

  var eventPlace = response._embedded.events

  //Loop populates document with events 
  for (var i = 0; i < apiEvents.length; i++) {

    // variable holds the time event takes place (24hr format HH:MM:SS)
    var time = apiEvents[i].dates.start.localTime

    //variable holds the date event takes place (YYYY-MM-DD)
    var date = apiEvents[i].dates.start.localDate

    // creates div to append all info of event along with needed attributes
    var parentEvent = $("<div>");
    parentEvent.attr({ "id": "event #" + (i + 1) })
    parentEvent.addClass(["eventDiv", "row"])

    //creates an img element along with needed attributes
    var imgEvent = $("<img>")
    imgEvent.attr({
      "id": "eventImg",
      "src": apiEvents[i].images[0].url,
      "class": "col-md-4"
    })

    //creating a div for the remaining 8 columns needed per bootstrap
    var divColumn = $("<div>")
    divColumn.addClass(["col-md-8", "info" + ([i] + 1)])

    //creaing a new row to insert Name of event with needed attributes
    var divRowName = $("<div>")
    divRowName.addClass("row")
    divColumn.append(divRowName)

    // create div to append event name to from array
    var namespan = $("<div>");
    namespan.addClass("col-md-12")
    namespan.text("Event: " + apiEvents[i].name);

    // append name to row 
    $(divRowName).append(namespan);

    //creating a new row to insert time and date with needed attributes
    var divRowTime = $("<div>")
    divRowTime.addClass("row")
    divColumn.append(divRowTime)

    // creating div for date and time 
    var timespan = $("<div>");
    timespan.addClass("col-md-12")

    //set the text to date and time of event
    timespan.text("When: " + getTimeAndDate(time, date));

    //append to row
    $(divRowTime).append(timespan);

    // creating a new row to insert location with needed attributes
    var divRowPlace = $("<div>")
    divRowPlace.addClass("row")
    divColumn.append(divRowPlace)

    // create div that will hold location of event with need attributes
    var placeDiv = $("<div>")
    placeDiv.addClass("col-md-12")
    placeDiv.text("Location: " + eventPlace[i]._embedded.venues[0].name + " " + eventPlace[i]._embedded.venues[0].address.line1)
    $(divRowPlace).append(placeDiv)

    //adding picture plus a new div to insert all other info
    parentEvent.append([imgEvent, divColumn]);

    //append event to document
    $(".Events").append(parentEvent);
  }

  //Function inputs the date and time and reformats it 
  function getTimeAndDate(eventTime, eventDate) {
    // variable will hold the year the event takes place
    var eventYear = eventDate.slice(0, 4)

    // variable will hold the month the event takes place
    var eventMonth = eventDate.slice(5, 7)

    // variable will hold the day the event takes place
    var eventDay = eventDate.slice(8, 10)

    //New date with US format
    eventDate = eventMonth + "/" + eventDay + "/" + eventYear

    // this will get our hour the event takes place
    var sliceNum = eventTime.slice(0, 2)

    //variable to represent Am or Pm
    var am_pm = "";

    if (+eventTime.slice(0, 2) < 12) {
      am_pm = "am"
    } else {
      // reassign variable to 12hr format for hour
      sliceNum = (+eventTime.slice(0, 2) - 12)
      am_pm = "pm"
    }

    // get the correct time format HH:MM
    var correctTimeFormat = sliceNum + eventTime.slice(2, 5)

    //Variable for correct date format MM/DD/YYYY at HH:MM
    var correctDateFormat = eventDate + " at " + correctTimeFormat + am_pm
    return correctDateFormat
  }
});