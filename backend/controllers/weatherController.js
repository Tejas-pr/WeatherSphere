const Weather = require("../models/Weather");
const {
  fetchWeatherData,
  fetchForecastWeatherData,
} = require("../services/weatherService");
const { DateTime } = require("luxon");

const formatLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) =>
  DateTime.fromSeconds(secs, { zone: "utc" })
    .plus({ seconds: offset })
    .toFormat(format);

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_max, temp_min, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    country,
    sunrise: formatLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatLocalTime(sunset, timezone, "hh:mm a"),
    details,
    icon: iconUrlFromCode(icon),
    speed,
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatLocalTime(f.dt, offset, "cccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getForcastWeatherData = async (city, unit) => {
  const weatherData = await fetchWeatherData(city, unit);

  const {
    coord: { lat, lon },
    timezone,
  } = weatherData;

  const forecastData = await fetchForecastWeatherData(city, unit);

  const formattedForecast = formatForecastWeather(
    weatherData.dt,
    timezone,
    forecastData.list
  );

  return { ...formatCurrentWeather(weatherData), ...formattedForecast };
};

const simulateWeatherDataForMetros = async (city, unit) => {
  try {
    const data = await fetchWeatherData(city, unit);

    const formattedWeather = formatCurrentWeather(data);

    return formattedWeather;
  } catch (error) {
    console.error(`Error fetching weather data for ${city} (Initial):`, error);
  }

  setInterval(async () => {
    try {
      const data = await fetchWeatherData(city, unit);

      const formattedWeather = formatCurrentWeather(data);

      return formattedWeather;
    } catch (error) {
      console.error(
        `Error fetching weather data for ${city} (Interval):`,
        error
      );
    }
  }, 30000);
};

const saveWeatherData = async (city, unit) => {
  try {
    const data = await fetchWeatherData(city, unit);

    const formattedWeather = formatCurrentWeather(data);

    const {
      temp_max,
      temp_min,
      humidity,
      lat,
      lon,
      dt,
      name: cityName,
      country,
      weather,
    } = formattedWeather;

    const weatherSummary = {
      city: cityName,
      country: country,
      lat: lat,
      lon: lon,
      date: new Date(dt * 1000).toISOString().split("T")[0],
      summary: {
        avg_temp: (temp_max + temp_min) / 2,
        max_temp: temp_max,
        min_temp: temp_min,
        avg_humidity: humidity,
        dominant_condition: weather[0].main,
        icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
      },
    };

    await Weather.create(weatherSummary);
  } catch (error) {
    console.error(`Error saving weather data:`, error);
  }
};

module.exports = {
  simulateWeatherDataForMetros,
  saveWeatherData,
  getForcastWeatherData,
};
