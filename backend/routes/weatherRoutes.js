const express = require("express");
const {
  simulateWeatherDataForMetros,
  saveWeatherData,
  getForecastWeatherData,
} = require("../controllers/weatherController"); // Adjust the path as needed
const Weather = require("../models/Weather"); // Corrected import for the Weather model

const router = express.Router();

// Route to get current weather data
router.get("/", async (req, res) => {
  const { city, unit } = req.query;
  try {
    const weatherData = await simulateWeatherDataForMetros(city, unit);
    console.log(weatherData);

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

// Route to get weather forecast
router.get("/forecast", async (req, res) => {
  const { lat, lon, unit } = req.query;

  if (!lat || !lon || !unit) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  console.log(lat, lon, unit);

  try {
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.WEATHER_API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();
    console.log(forecastData);
    res.json(forecastData);
  } catch (error) {
    console.error("Error fetching forecast data:", error.message);
    res.status(500).json({ error: "Error fetching forecast data" });
  }
});

router.post("/add", async (req, res) => {
  const {
    city,
    country,
    lat,
    lon,
    date,
    summary, 
  } = req.body;

  console.log("In /add route");
  console.log("Request body:", req.body); // Log the request body

  if (
    !city ||
    !country ||
    !lat ||
    !lon ||
    !date ||
    !summary ||
    !summary.avg_temp ||
    !summary.max_temp ||
    !summary.min_temp ||
    !summary.avg_humidity ||
    !summary.avg_wind_speed ||
    !summary.dominant_condition ||
    !summary.icon
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const weatherData = new Weather(req.body);
  try {
    await weatherData.save();
    res.status(201).json({ message: "Weather data saved successfully." });
  } catch (error) {
    console.error(`Error saving weather data: ${error.message}`);
    res.status(500).json({ error: "Failed to save weather data" });
  }
});

// Route to fetch saved weather data
router.get("/fetch", async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).send(weatherData);
    console.log("here is the featched data: ")
    console.log(weatherData)
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Route to simulate weather data fetching (if needed)
router.get("/simulate", async (req, res) => {
  const { city, unit } = req.query; 
  try {
    await simulateWeatherDataForMetros(city, unit);
    res.status(200).json({ message: "Weather data simulation started." });
  } catch (error) {
    console.error(`Error simulating weather data: ${error}`);
    res.status(500).json({ error: "Failed to simulate weather data" });
  }
});

module.exports = router;
