const nodemailer = require("nodemailer");
const Weather = require("../models/Weather");
const Alert = require("../models/Alert");
const {
  fetchWeatherData,
  fetchForecastWeatherData,
} = require("../services/weatherService");
const { DateTime } = require("luxon");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSKEY,
  },
});

const sendEmail = async (to, subject, text, htmlContent) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const formatLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
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
      console.error(`Error fetching weather data for ${city} (Interval):`, error);
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

let lastAlertTime = {};

const checkAlerts = async () => {
  try {
    const alerts = await Alert.find();
    if (!Array.isArray(alerts)) {
      console.error("Expected alerts to be an array.");
      return;
    }

    for (let alert of alerts) {
      const { city, threshold, email, _id } = alert; // Include the alert ID

      try {
        const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
        const weatherData = await response.json();

        const now = Date.now();
        const alertKey = `${city}-${threshold}`;
        const lastSent = lastAlertTime[alertKey];

        if (!lastSent || now - lastSent > 3600000) {
          const currentTempCelsius = (weatherData.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius and format

          if (currentTempCelsius > threshold) {
            const message = `
              <h1>Weather Alert for ${city}</h1>
              <p>The temperature has exceeded your set threshold!</p>
              <p>Current Temperature: <strong>${currentTempCelsius}°C</strong></p>
              <p>Threshold Temperature: <strong>${threshold}°C</strong></p>
              <p>Please take the necessary precautions.</p>
              <p>Alert is deleted!!</p>
            `;

            await sendEmail(
              email,
              `Weather Alert for ${city}`,
              "Your threshold temperature is reached:",
              message
            );

            lastAlertTime[alertKey] = now;
            await Alert.deleteOne({ _id }); // Remove the alert from the database
          }
        }
      } catch (error) {
        console.error("Error fetching weather data for alert:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching alerts from database:", error);
  }
};

setInterval(checkAlerts, 60000);

module.exports = {
  simulateWeatherDataForMetros,
  saveWeatherData,
  getForcastWeatherData,
  sendEmail,
};
