let now = new Date();
let span = document.querySelector("#days-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
span.innerHTML = `${day} | ${hours}:${minutes}`;

function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let water = document.querySelector("#water");
  water.innerHTML = response.data.main.humidity;
  let air = document.querySelector("#air");
  air.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "e1fa0315382cc468b94d42d3450fe53e";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function loadSearch(event) {
  debugger;
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "e1fa0315382cc468b94d42d3450fe53e";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", loadSearch);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
