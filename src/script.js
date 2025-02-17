function refreshWeather(response) {
  let cityElement = document.querySelector("#city-name");
  let timeElement = document.querySelector("#day-time");
  let temperatureElement = document.querySelector("#current-temp-value");
  let feelsLikeElement = document.querySelector("#feels-like");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  let cityName = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);
  let icon = response.data.condition.icon_url;

  cityElement.innerHTML = cityName;
  timeElement.innerHTML = formattedDate(date);
  temperatureElement.innerHTML = temperature;
  feelsLikeElement.innerHTML = `${feelsLike}ºC`;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} km/h`;
  iconElement.innerHTML = `<img src="${icon}" alt="Weather icon" class="current-temp-icon" />`;
}

function formattedDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let weekDay = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${weekDay} ${hours}:${minutes}`;
}

function searchCityWeather(city) {
  let apiKey = "f2c0f64fea8a97035ob72fc34f61t3e3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchInput.value;

  searchCityWeather(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCityWeather("Barcelona");
