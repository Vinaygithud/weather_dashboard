const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("city-input");

const searchForm = document.getElementById("search-form");

const weatherInfo = document.getElementById("weather-info");

const forecastInfo = document.getElementById("forecast-info");

const mapInfo = document.getElementById("map-info");

const map = document.getElementById("map");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const weatherData = data;

      const cityName = weatherData.name;

      const weatherDescription = weatherData.weather[0].description;

      const temperature = weatherData.main.temp;

      const humidity = weatherData.main.humidity;

      const windSpeed = weatherData.wind.speed;

      weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p>Weather: ${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          const forecastData = data;


          const forecastList = document.getElementById("forecast-list");

          const forecastItems = forecastData.list.map((forecast) => {
            return `
              <li>
                <h3>${forecast.dt_txt}</h3>
                <p>Weather: ${forecast.weather[0].description}</p>
                <p>Temperature: ${forecast.main.temp}°C</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind Speed: ${forecast.wind.speed} m/s</p>
              </li>
            `;
          });

          forecastList.innerHTML = forecastItems.join("");
        });
    });

  const mapOptions = {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12,
  };

  const mapInstance = new google.maps.Map(map, mapOptions);

  const marker = new google.maps.Marker({
    position: mapOptions.center,
    map: mapInstance,
  });
});