latitude = 37.8267;
longitude = -122.4233;
//Dark Sky Api Format
var apiKey = "1408b38a9701141fa75c8f041fca27e8",
  url = "https://api.darksky.net/forecast/",
  lati = latitude,
  longi = longitude,
  dark_Sky_api_call = url + apiKey + "/" + lati + "," + longi;

// latitude = 37.8267
// longitude = -122.4233
console.log(dark_Sky_api_call);

//convert zip to lat long
// example below requires google geocoder need to find new api
// zipcode = 60614
// function getLatLngByZipcode(zipcode) {
//     var geocoder = new google.maps.Geocoder();
//     var address = zipcode;
//     geocoder.geocode({ 'address': address }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             var latitude = results[0].geometry.location.lat();
//             var longitude = results[0].geometry.location.lng();
//             alert("Latitude: " + latitude + "\nLongitude: " + longitude);
//         } else {
//             alert("Request failed.")
//         }
//     });

//     return [latitude, longitude];
//     console.log(latitude, longitude)
// }
