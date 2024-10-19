const express = require("express");
const {
  simulateWeatherDataForMetros,
  saveWeatherData,
  getForecastWeatherData,
} = require("../controllers/weatherController");
const Weather = require("../models/Weather");
const Alert = require("../models/Alert");

const router = express.Router();

// Route to get current weather data
router.get("/", async (req, res) => {
  const { city, unit } = req.query;
  try {
    const weatherData = await simulateWeatherDataForMetros(city, unit);

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

  try {
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.WEATHER_API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();
    res.json(forecastData);
  } catch (error) {
    console.error("Error fetching forecast data:", error.message);
    res.status(500).json({ error: "Error fetching forecast data" });
  }
});

router.post("/add", async (req, res) => {
  const { city, country, lat, lon, date, summary } = req.body;

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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWeather = await Weather.findByIdAndDelete(id);

    if (!deletedWeather) {
      return res.status(404).json({ error: "Weather data not found" });
    }

    res.status(200).json({ message: "Weather data deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting weather data" });
  }
});

router.post("/alerts", async (req, res) => {
  const { email, city, threshold } = req.body;

  try {
    const alert = new Alert({ email, city, threshold });
    await alert.save(); // Save the alert to the database
    res.json({ message: "Alert set successfully" });
  } catch (error) {
    console.error("Error setting alert:", error);
    res.status(500).json({ message: "Failed to set alert" });
  }
});

module.exports = router;
