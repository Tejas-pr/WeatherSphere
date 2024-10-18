// weatherRoutes.js
const express = require("express");
const { simulateWeatherDataForMetros, saveWeatherData, getForcastWeatherData } = require("../controllers/weatherController"); // Adjust the path as needed

const router = express.Router();

// Route to get current and forecast weather data
router.get("/", async (req, res) => {
  const { city, unit } = req.query; 
  try {
    const weatherData = await simulateWeatherDataForMetros(city, unit);
    // console.log(weatherData)

    res.json(weatherData); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

// get weather forcast
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




// Route to save weather data
router.post("/save", async (req, res) => {
  const { city, unit } = req.body; // Get city and unit from request body
  try {
    await saveWeatherData(city, unit);
    res.status(201).json({ message: "Weather data saved successfully." });
  } catch (error) {
    console.error(`Error saving weather data: ${error}`);
    res.status(500).json({ error: "Failed to save weather data" });
  }
});

// Route to simulate weather data fetching (if needed)
router.get("/simulate", async (req, res) => {
  const { city, unit } = req.query; // Get city and unit from query parameters
  try {
    await simulateWeatherDataForMetros(city, unit);
    res.status(200).json({ message: "Weather data simulation started." });
  } catch (error) {
    console.error(`Error simulating weather data: ${error}`);
    res.status(500).json({ error: "Failed to simulate weather data" });
  }
});

module.exports = router;
