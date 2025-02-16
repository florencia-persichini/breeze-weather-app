function refreshWeather(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector(
    "#current-temp-value"
  );
  let cityName = response.data.city;
  let temperature = Math.round(response.data.temperature.current);

  cityElement.innerHTML = cityName;
  temperatureElement.innerHTML = temperature;
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
  let city = searchInput.value;
  cityElement.innerHTML = city;

  searchCityWeather(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCityWeather("Barcelona");
