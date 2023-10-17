const APIKey = "2b0d82c56713c6ea8be1f1b334a862ab";
var searchButton = $('#searchBtn');
var savedSearch = document.getElementsByClassName("listItem");
var citySearches = JSON.parse(localStorage.getItem("cities")) || [];

searchButton.click(function() {
  var searchCity = $('#searchBar').val();
  getLocation(searchCity);
});

function updateSearches(cityDetails) {
  var citySearches = JSON.parse(localStorage.getItem("cities")) || [];
  
  if (!citySearches.includes(cityDetails)) {
    citySearches.push(cityDetails);

    if (citySearches.length > 10) {
      citySearches.shift();
    }
    localStorage.setItem("cities", JSON.stringify(citySearches));
  }
}

function updateSearchList() {
  var searchList = $('#searchList');

  var citySearches = JSON.parse(localStorage.getItem("cities")) || [];
  searchList.empty();
  citySearches.reverse();
  
   for (var i = 0; i < citySearches.length; i++) {
    var listItem = $('<button>').addClass('listItem').text(citySearches[i]);
    listItem.css({
      margin: '5px',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      backgroundColor: '#BCE0ED',
      border: 'none',
      borderRadius: '5px',
      padding: '5px',
    })
    searchList.append(listItem);
    
    listItem.on("click", function() {
      var buttonText = $(this).text();
      handleSavedSearch(buttonText);
    });
  }
}


  function handleSavedSearch(buttonText) {
    var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + buttonText + '&limit=1&appid=' + APIKey;
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
        updateSearches(cityDetails);
        updateSearchList();
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




// must be at the end

$(document).ready(function() {
  updateSearchList();
});