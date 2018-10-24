zip = 60614;
//extra values of 00 at the end of YYYYMMDD
EventfulDateString = "2018102500-2018103100";

//Api url - includes zip and date. date is set as a range to then get time of day we need to leverage the data in the pull. heroku to get around CORS permissions
(eventfulUrl =
  "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?"),
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
  // console.log(response);

  //log the object response. This feeds as an XML thus we need to JSON. PARSE
  //NEED TO PARSE RESPONSES BECAUSE ITS COMING IN AS XML
  console.log(JSON.parse(response));
});
