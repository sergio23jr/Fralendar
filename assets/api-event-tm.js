zip = 60614;
EventfulDateString = "2018-10-25T10:00:00Z";

// Api url - includes zip and date. date is set as a range to then get time of day we need to leverage the data in the pull.heroku allows us to bypass CORS permission
(eventfulUrl =
  "https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?"),
  (eventfulZip = zip),
  (eventfulKey = "apikey=aw1x9XltYOH5uHXUYANmxJszqWA77OZR"),
  (eventfulDate = EventfulDateString),
  (eventfulApiCall =
    eventfulUrl +
    eventfulKey +
    "&" +
    "postalCode=" +
    eventfulZip +
    "&" +
    "startDateTime=" +
    eventfulDate +
    "&" +
    "endDateTime=" +
    eventfulDate);

//create an Ajax call
$.ajax({
  type: "GET",
  url: eventfulApiCall
}).then(function(response) {
  //log the queryURL
  console.log(eventfulApiCall);
  //log the result and specific paramters
  console.log(response);
  console.log(response._embedded);
});
