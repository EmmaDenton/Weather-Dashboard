# Weather-Dashboard

This project is a weather dashboard that allows users to search for weather information based on a city. Upon searching, the site retrieves the latitude and longitude of the city, which is then used to fetch the current and future weather conditions for the next 5 days. Additionally, the project includes a feature that saves the 10 most recent searches to the local storage. These saved searches are displayed as buttons beneath the search input, enabling users to quickly navigate back to a previous search by simply clicking on the corresponding button.

![deployed site](<assets/images/Screenshot 2023-10-18 at 9.48.01 am.png>)

## User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city