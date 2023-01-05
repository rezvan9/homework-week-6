let now = new Date();
let day = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();
let zero = 0;
let currentDate = document.querySelector(".current-date");
let form = document.querySelector(".form");
let button = document.querySelector(".btn-secondary");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

if (minutes >= 10) {
  zero = "";
}

function showWeather(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector(".current-deg").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".today-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".today-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "b3a312b2823c477f40bbb6c6210a1736";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=${units}&APPID=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-box").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "b3a312b2823c477f40bbb6c6210a1736";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&APPID=${apiKey}`;

  axios.get(url).then(showWeather);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

currentDate.innerHTML = `${days[day]} ${hours} : ${zero}${minutes}`;

form.addEventListener("submit", showCity);
button.addEventListener("click", showPosition);

searchCity("banff");
