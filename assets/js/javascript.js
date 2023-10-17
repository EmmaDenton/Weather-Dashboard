const APIKey = "2b0d82c56713c6ea8be1f1b334a862ab";
const searchButton = $('#searchBtn');
const savedSearch = document.querySelectorAll(".listItem");
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
  const searchList = document.querySelector('#searchList');

  const citySearches = JSON.parse(localStorage.getItem("cities")) || [];
  searchList.innerHTML = '';
  citySearches.reverse();
  
   for (let i = 0; i < citySearches.length; i++) {
    const listItem = document.createElement('button');
    listItem.classList.add('listItem');
    listItem.textContent = citySearches[i];
    listItem.style.margin = '5px';
    listItem.style.fontSize = '20px';
    listItem.style.display = 'flex';
    listItem.style.alignItems = 'center';
    listItem.style.width = '90%';
    listItem.style.backgroundColor = '#BCE0ED';
    listItem.style.border = 'none';
    listItem.style.borderRadius = '5px';
    listItem.style.padding = '5px';
    
    listItem.addEventListener("mouseenter", function() {
      listItem.style.backgroundColor = '#77C3DF';
    });
    
    listItem.addEventListener("mouseleave", function() {
      listItem.style.backgroundColor = '#BCE0ED';
    });
    
    listItem.addEventListener("click", function() {
      const buttonText = listItem.textContent;
      listItem.style.color = 'white';
      handleSavedSearch(buttonText);
    });
    
    searchList.appendChild(listItem);
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
  var searchCity = 'Sydney';
  getLocation(searchCity)
});

