const express = require("express");
const {
  simulateWeatherDataForMetros,
  saveWeatherData,
} = require("../controllers/weatherController");
const router = express.Router();

// Route to get saved weather data
router.get("/weather", async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Route to simulate weather data for metros (with city as a query parameter)
router.post("/simulate-weather", async (req, res) => {
  const { city, unit } = req.body; // Get the city from query parameters
  try {
    await simulateWeatherDataForMetros(city, unit); // Pass the city to the function
    res.status(200).json({ message: `Simulation started for ${city}` });
  } catch (error) {
    res.status(500).json({ error: `Error starting simulation for ${city}` });
  }
});

// Route to save weather data manually (with city as a query parameter)
router.post("/save-weather", async (req, res) => {
  const { city, unit } = req.body; // Use request body to pass city and unit
  try {
    await saveWeatherData(city, unit); // Pass the city and unit to the function
    res.status(200).json({ message: `Weather data saved for ${city}` });
  } catch (error) {
    res.status(500).json({ error: `Error saving weather data for ${city}` });
  }
});

module.exports = router; // Export the router
