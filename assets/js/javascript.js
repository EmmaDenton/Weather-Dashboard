const APIKey = "2b0d82c56713c6ea8be1f1b334a862ab";

var searchButton = $('#searchBtn');

searchButton.click(function() {
  var searchCity = $('#searchBar').val();
  getLocation(searchCity);
});

function getLocation(searchCity) {
  var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchCity + '&limit=1&appid=' + APIKey;
  fetch(url)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          console.log(data);
          var lat = data[0].lat;
          var lon = data[0].lon;
          getWeatherForecast(lat, lon);
      })
}

function getWeatherForecast(lat, lon) {
  var url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
  fetch(url)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          console.log(data);
      })
}