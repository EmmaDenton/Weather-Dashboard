const APIKey = "2b0d82c56713c6ea8be1f1b334a862ab";
var searchButton = $('#searchBtn');
var citySearches = JSON.parse(localStorage.getItem("cities")) || [];

searchButton.click(function() {
  var searchCity = $('#searchBar').val();
  updateSearches(searchCity);
  getLocation(searchCity);
});

function updateSearches(newCity) {
  if (!citySearches.includes(newCity)) {
    citySearches.push(newCity);

    if (citySearches.length > 10) {
      citySearches.shift();
    }

    localStorage.setItem("cities", JSON.stringify(citySearches));
  }
}

function getLocation(searchCity) {
  var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchCity + '&limit=1&appid=' + APIKey;
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
        var forecastData = data.list;
        var cityDetails = data.city.name;
        populateCards(forecastData, cityDetails);
    })
}

function populateCards(forecastData, cityDetails) {
  var cards = document.querySelectorAll('.card');

  if (cards.length > 0) {
    var name = cards[0].querySelector('#CityName');
    name.textContent = cityDetails;
  }
  
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];

    var date = card.querySelector('.date');
    date.textContent = formatDate(i);

    var temp = card.querySelector('.temp');
    temp.textContent = getTemp(i, forecastData);
    
    var wind = card.querySelector('.wind');
    wind.textContent = getWindSpeed(i, forecastData);

    var humidity = card.querySelector('.humidity');
    humidity.textContent = getHumidity(i, forecastData);
  }
}



function formatDate(index) {
  var date = new Date();
  date.setDate(date.getDate() + index);
  var formattedDate = date.toLocaleDateString('en-US', {day: 'numeric', month: 'short'});
  return formattedDate;
}

function getTemp(index, forecastData) {
  var temp = 'Temp: ' +  forecastData[index].main.temp;
  return temp;
}

function getWindSpeed(index, forecastData) {
  var windSpeed = 'Wind: ' +  forecastData[index].wind.speed;
  return windSpeed;
}

function getHumidity(index, forecastData) {
  var humidity = 'Humidity: ' + forecastData[index].main.humidity;
  return humidity;
}