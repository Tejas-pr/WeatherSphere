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
  const [forecast, setForecast] = useState(null);

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

      const { lat, lon } = data;

      const forecastResponse = await fetch(
        `http://localhost:3000/api/weather/forecast?lat=${lat}&lon=${lon}&unit=${units}`
      );
      const forecastData = await forecastResponse.json();

      // console.log("HERE");
      // console.log(forecastData);
      // console.log(forecastData.list);

      // Calculate average values
      const totalTemp = forecastData.list.reduce(
        (acc, item) => acc + item.main.temp,
        0
      );
      const avgTemp = totalTemp / forecastData.list.length;

      const totalHumidity = forecastData.list.reduce(
        (acc, item) => acc + item.main.humidity,
        0
      );
      const avgHumidity = totalHumidity / forecastData.list.length;

      const totalWindSpeed = forecastData.list.reduce(
        (acc, item) => acc + item.wind.speed,
        0
      );
      const avgWindSpeed = totalWindSpeed / forecastData.list.length;

      setWeather({ ...data, avgTemp, avgHumidity, avgWindSpeed });
      setForecast(forecastData.list);
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div
      className={`mx-auto py-5 px-32 bg-gradient-to-br from-cyan-600 to-blue-700`}
    >
      <TopButton setQuery={setQuery} />
      <Input query={query} setUnits={setUnits} setQuery={setQuery} />{" "}
      {/* Pass query here */}
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          {forecast ? (
            <Forecast title="3 hour step forecast" data={forecast} />
          ) : (
            <p>Loading forecast...</p>
          )}
        </>
      )}
      <ToastContainer autoClose={1000} hideProgressBar={true} theme="dark" />
    </div>
  );
};

export default App;
