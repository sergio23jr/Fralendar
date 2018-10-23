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
}).then(function(response) {
  //log the queryURL
  console.log(response);
  //log the result and specific paramters
  console.log(tmApiCall);
  //Pull in event name
  console.log(response._embedded.events[0].name);

  //Get Venue latitude for weather
  console.log(
    response._embedded.events[0]._embedded.venues[0].location.latitude
  );
  //Get venue longitutude for weather
  console.log(
    response._embedded.events[0]._embedded.venues[0].location.longitude
  );
  apiEvents = response._embedded.events;
  console.log(apiEvents);
  //for loop to pull in all events for the week.
  for (let z = 0; z < apiEvents.length; z++) {
    console.log(apiEvents[z].name);
    console.log(apiEvents[z].dates);
    console.log(apiEvents[z].dates.start.localDate);
    console.log(apiEvents[z].dates.start.localTime);
  }
});
