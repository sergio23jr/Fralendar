zip = 60614;
EventfulDateString = "2018102000-2018102000";

//Api url - includes zip and date. date is set as a range to then get time of day we need to leverage the data in the pull.
(eventfulUrl = "http://api.eventful.com/rest/events/search?"),
  (eventfulZip = zip),
  (eventfulKey = "app_key=SbhFzbfzfXwhtkTg"),
  (eventfulDate = EventfulDateString),
  (eventfulApiCall =
    eventfulUrl +
    "location=" +
    eventfulZip +
    "&" +
    eventfulKey +
    "&" +
    "date=" +
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
});