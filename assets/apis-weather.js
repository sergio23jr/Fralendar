latitude = 41.881832;
longitude = -87.623177;
weatherTime = 1540148070;

// this allows the API to run past CORS permissions

//Dark Sky Api Format
//Needs to be lat , long , Unix time (this includes both date and time in its value) heroku allows us to bypass CORS permissions
var apiKey = "1408b38a9701141fa75c8f041fca27e8",
  url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/",
  lati = latitude,
  longi = longitude,
  unixTime = weatherTime,
  dark_Sky_api_call = url + apiKey + "/" + lati + "," + longi + "," + unixTime;

// Call
$.ajax({
  type: "GET",
  url: dark_Sky_api_call
}).then(function(response) {
  //log the queryURL
  console.log(dark_Sky_api_call);
  //log the result and specific paramters
  console.log(response);
  console.log(response.currently.summary);
  console.log(response.currently.apparentTemperature);
  console.log(response.currently.precipProbability);

  //write temp to table
  $("#Temp").html(response.currently.temperature);
  $("#Status").html(response.currently.summary);
  $("#Precipprob").html(response.currently.precipProbability);

  //Make Precipitation Probability a percentage
  // var precippercent = precipProbability * 100;
  // console.log(precippercent);
});
