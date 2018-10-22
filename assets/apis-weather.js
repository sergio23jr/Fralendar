latitude = 41.881832;
longitude = -87.623177;
weatherTime = 1540148070;
//Dark Sky Api Format
//Needs to be lat , long , Unix time (this includes both date and time in its value)
var apiKey = "1408b38a9701141fa75c8f041fca27e8",
  url = "https://api.darksky.net/forecast/",
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
});
