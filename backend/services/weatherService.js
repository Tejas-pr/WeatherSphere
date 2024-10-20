const axios = require("axios");

const fetchWeatherData = async (city, unit) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
  );
  return response.data;
};

const fetchForecastWeatherData = async (city, unit) => {
  const weatherData = await fetchWeatherData(city, unit);

  const {
    coord: { lat, lon },
  } = weatherData;

  const forecastResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
  );

  return forecastResponse.data;
};

module.exports = {
  fetchWeatherData,
  fetchForecastWeatherData,
};
