import React, { useEffect, useState } from "react";
import TopButton from "./components/TopButton";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [query, setQuery] = useState({ q: "Bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // State for forecast data

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(capitalizeFirstLetter(cityName));

    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?city=${cityName}&unit=${units}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Full weather data response:", data);

      const { lat, lon } = data; // Destructure lat and lon
      console.log("Latitude:", lat, "Longitude:", lon);

      // Fetch forecast using lat and lon
      const forecastResponse = await fetch(
        `http://localhost:3000/api/weather/forecast?lat=${lat}&lon=${lon}&unit=${units}`
      );
      const forecastData = await forecastResponse.json();
      console.log("Forecast data:", forecastData);

      setWeather(data); // Set the weather data
      setForecast(forecastData.list); // Set the forecast data
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    }
  };

  // Call getWeather only when query or units change
  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div
      className={`mx-auto py-5 px-32 bg-gradient-to-br from-cyan-600 to-blue-700`}
    >
      <TopButton setQuery={setQuery} />
      <Input setUnits={setUnits} setQuery={setQuery} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          {forecast ? ( // Check if forecast data exists
            <Forecast title="3 hour step forecast" data={forecast} />
          ) : (
            <p>Loading forecast...</p> // Show loading if forecast data is not ready
          )}
        </>
      )}
      <ToastContainer autoClose={1000} hideProgressBar={true} theme="dark" />
    </div>
  );
};

export default App;
