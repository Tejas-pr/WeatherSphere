const nodemailer = require("nodemailer");
const Weather = require("../models/Weather");
const Alert = require("../models/Alert");
const {
  fetchWeatherData,
  fetchForecastWeatherData,
} = require("../services/weatherService");
const { DateTime } = require("luxon");
require("dotenv").config();

let lastAlertTime = {};

const checkAlerts = async () => {
  console.log("Checking alerts...");
  console.log("Trying to send email...")
  try {
    const alerts = await Alert.find();
    if (!Array.isArray(alerts)) {
      console.error("Expected alerts to be an array.");
      return;
    }

    for (let alert of alerts) {
      const { city, threshold, email, _id } = alert;

      try {
        const response = await fetch(
          `http://localhost:3000/api/weather?city=${city}`
        );
        const weatherData = await response.json();
        const now = Date.now();
        const alertKey = `${city}-${threshold}`;
        const lastSent = lastAlertTime[alertKey];

        if (!lastSent || now - lastSent > 3600000) {
          const currentTempCelsius = (weatherData.temp - 273.15).toFixed(2);

          if (currentTempCelsius > threshold) {
            const message = `
              <div style="background-color:#000; color:#fff; padding:20px; border-radius:10px; font-family:Arial, sans-serif; text-align:center;">
                <h1 style="font-size:28px; color:#ffcc00;">⚠️ Weather Alert for ${city} ⚠️</h1>
                <p style="font-size:18px; margin-top:10px;">The temperature in <strong>${city}</strong> has <span style="color:#ff6347;">exceeded</span> your set threshold!</p>
                
                <div style="margin:20px 0;">
                  <p style="font-size:24px;">🌡️ <strong>Current Temperature:</strong> ${currentTempCelsius}°C</p>
                  <p style="font-size:24px;">🎯 <strong>Threshold Temperature:</strong> ${threshold}°C</p>
                </div>
                
                <p style="font-size:18px;">Please take the necessary precautions to stay safe and cool 🧊.</p>
                <p style="font-size:18px; margin-top:20px;">The alert has been deleted to avoid spam. Set a new alert if needed 🚨.</p>
                
                <h3 style="margin-top:30px; color:#ffcc00;">Thank you for using Weather Sphere 🌦️</h3>
                <p style="font-size:16px;">Stay weather-aware, stay safe! 🌤️</p>
                
                <p style="font-size:14px; color:#ccc; margin-top:40px;">Licensed By: </p>
                
                <p style="font-size:14px; color:#ccc; margin-bottom:0;">
                  <a href="mailto:tejas.teju02@gmail.com" style="color:#ffcc00;">Created by Tejas</a>
                </p>
                
                <div style="margin-top:10px;">
                  <a href="https://github.com/Tejas-pr" target="_blank" style="display:inline-block;">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style="width:30px; height:30px;" />
                  </a>
                  <a href="https://www.instagram.com/tejas_p_r/profilecard/?igsh=MWs5Y3kxenptYXIxdA==" target="_blank" style="display:inline-block;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style="width:30px; height:30px;" />
                  </a>
                </div>
              </div>
            `;

            await sendEmail(email, `Weather Alert for ${city}`, "Weather Alert", message);
            lastAlertTime[alertKey] = now;

            await Alert.deleteOne({ _id });
          }
        }
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
      }
    }
  } catch (error) {
    console.error("Error checking alerts:", error);
  }
};

setInterval(checkAlerts, 30000);

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

  return { hourly };
};

const getForecastWeatherData = async (city, unit) => {
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
    return formatCurrentWeather(data);
  } catch (error) {
    console.log("Please reload the page!", error);
  }
};

const saveWeatherData = async (city, unit) => {
  try {
    const data = await fetchWeatherData(city, unit);
    const formattedWeather = formatCurrentWeather(data);

    const {
      lat,
      lon,
      dt,
      name: cityName,
      country,
      weather,
    } = formattedWeather;

    const forecastData = await fetchForecastWeatherData(lat, lon, unit); 

    const totalTemp = forecastData.list.reduce(
      (acc, item) => acc + item.main.temp,
      0
    );
    const avgTemp = totalTemp / forecastData.list.length;

    const weatherSummary = {
      city: cityName,
      country: country,
      lat: lat,
      lon: lon,
      date: new Date(dt * 1000).toISOString().split("T")[0],
      summary: {
        avg_temp: avgTemp,
        max_temp: Math.max(...forecastData.list.map(item => item.main.temp)),
        min_temp: Math.min(...forecastData.list.map(item => item.main.temp)),
        avg_humidity: forecastData.list.reduce((acc, item) => acc + item.main.humidity, 0) / forecastData.list.length,
        dominant_condition: weather[0].main,
        icon: iconUrlFromCode(weather[0].icon),
      },
    };

    await Weather.create(weatherSummary);
  } catch (error) {
    console.error(`Error saving weather data:`, error);
  }
};


module.exports = {
  simulateWeatherDataForMetros,
  getForecastWeatherData,
  saveWeatherData,
  checkAlerts,
};
