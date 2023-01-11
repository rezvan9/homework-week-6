function formatDate() {
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

  currentDate.innerHTML = `last updated : ${days[day]} ${hours} : ${minutes}`;
}


function weekDay(weekDay){
  
  // console.log(weekDay[0].dt_txt)

  weekDay.forEach()
}


function formatDay(timeStamp) {
  
  let date = new Date(timeStamp * 1000); 
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[day];
}
function showForecast(response) {
  let forecast = response.data.list;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                  <p class="date">${formatDay(forecastDay.dt)}</p>
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="weather-icons"
                    class="icons"
                  />
                  <br />
                  <span class="temp">
                    <span class="low-temp">${Math.round(
                      forecastDay.main.temp_min
                    )}°</span>
                    <strong>${Math.round(forecastDay.main.temp_max)}°</strong>
                  </span>
                </div>
              `;
    }
    
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  weekDay(forecast);
}

function getForecast(coordinates) {
  let apiKey = "b3a312b2823c477f40bbb6c6210a1736";
  let apiUrl = `
  https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-deg").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemp = response.data.main.temp;

  document.querySelector("#today-low").innerHTML = Math.round(
    response.data.main.temp_min
  );

  todayLow = response.data.main.temp_min;

  document.querySelector("#today-high").innerHTML = Math.round(
    response.data.main.temp_max
  );

  todayHigh = response.data.main.temp_max;

  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
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

function showFahrenheit(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);

  let currentDegree = document.querySelector("#current-deg");
  currentDegree.innerHTML = fahrenheitTemp;

  document.querySelector("#today-low").innerHTML = Math.round(
    (todayLow * 9) / 5 + 32
  );

  document.querySelector("#today-high").innerHTML = Math.round(
    (todayHigh * 9) / 5 + 32
  );
}

function showCelsius(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  document.querySelector("#current-deg").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#today-low").innerHTML = Math.round(todayLow);
  document.querySelector("#today-high").innerHTML = Math.round(todayHigh);
}

let celsiusTemp = null;
let todayLow = null;
let todayHigh = null;

let form = document.querySelector(".form");
form.addEventListener("submit", showCity);

let button = document.querySelector(".btn-secondary");
button.addEventListener("click", showPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

searchCity("banff");
