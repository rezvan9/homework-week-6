let form = document.querySelector(".form");
let button = document.querySelector(".btn-secondary");

function formatDate(timeStamp) {
  let now = new Date();
  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let currentDate = document.querySelector("#current-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  currentDate.innerHTML = `last update : ${days[day]} ${hours} : ${minutes}`;
}

function showWeather(response) {
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-deg").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#today-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#today-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  formatDate(response.data.dt * 1000);
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

form.addEventListener("submit", showCity);
button.addEventListener("click", showPosition);

searchCity("banff");
