import React, { useEffect, useState } from "react";
import TopButton from "../components/TopButton";
import Input from "../components/Input";
import TimeAndLocation from "../components/TimeAndLocation";
import TempAndDetails from "../components/TempAndDetails";
import Forecast from "../components/Forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [query, setQuery] = useState({ q: "Bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Fetch the weather data
  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(capitalizeFirstLetter(cityName));

    try {
      const response = await fetch(`http://localhost:3000/api/weather/weather?city=${cityName}&unit=${units}`);
      console.log(response)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(`Fetched weather for ${data.name} ${data.country}`);
      setWeather(data);
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    }
  };

  // Call getWeather only when query or units change
  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div className="mx-auto py-5 px-32 bg-gradient-to-br from-cyan-600 to-blue-700">
      <TopButton setQuery={setQuery} />
      <Input setUnits={setUnits} setQuery={setQuery} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          {/* <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} /> */}
        </>
      )}
      <ToastContainer autoClose={1000} hideProgressBar={true} theme="dark" />
    </div>
  );
};

export default App;
