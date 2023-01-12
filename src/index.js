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

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {

    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                  <p class="date">${formatDay(forecastDay.time)}</p>
                  <img
                    src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png"
                    
                    alt="weather-icons"
                    class="icons"
                  />
                  <br />
                  <span class="temp">
                    <span class="low-temp">${Math.round(
                      forecastDay.temperature.minimum
                    )}°</span>
                    <strong>${Math.round(
                      forecastDay.temperature.maximum
                    )}°</strong>
                  </span>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "5dd9064aa0ft48879adcb6c3384704co";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}
  `;

  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#current-deg").innerHTML = Math.round(
    response.data.temperature.current
  );

  celsiusTemp = response.data.temperature.current;

  document.querySelector(".description").innerHTML =
    response.data.condition.description;

  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  formatDate(response.data.time * 1000);
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "5dd9064aa0ft48879adcb6c3384704co";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}

function showCity(event) {
  event.preventDefault();

  let city = document.querySelector(".search-box").value;
  searchCity(city);
}

function searchLocation(position) {
  console.log(position)
  let apiKey = "5dd9064aa0ft48879adcb6c3384704co";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;

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
}

function showCelsius(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  document.querySelector("#current-deg").innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector(".form");
form.addEventListener("submit", showCity);

let button = document.querySelector(".btn-secondary");
button.addEventListener("click", showPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

searchCity("banff");
