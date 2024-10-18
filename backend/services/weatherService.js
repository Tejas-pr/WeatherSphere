const axios = require("axios");

const fetchWeatherData = async (city, unit) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${process.env.WEATHER_API_KEY}`
  );
  // console.log(response);
  // console.log(response.data);
  return response.data;
};

module.exports = fetchWeatherData;
