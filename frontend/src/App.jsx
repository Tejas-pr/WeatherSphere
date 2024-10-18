import React, { useEffect, useState } from "react";
import TopButton from "./components/TopButton";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeatherPopup from "./components/WeatherCard"; 

const App = () => {
  const [query, setQuery] = useState({ q: "Bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherDataList, setWeatherDataList] = useState([]); 
  const [showPopup, setShowPopup] = useState(false); 

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
      console.log("here");
      console.log("here");
      const data = await response.json();
      console.log(data)
      const { lat, lon } = data;

      const forecastResponse = await fetch(
        `http://localhost:3000/api/weather/forecast?lat=${lat}&lon=${lon}&unit=${units}`
      );
      const forecastData = await forecastResponse.json();

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

      const weatherConditions = forecastData.list.map(
        (item) => item.weather[0].main
      );
      const conditionCounts = {};

      weatherConditions.forEach((condition) => {
        conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
      });

      const dominantCondition = Object.keys(conditionCounts).reduce((a, b) =>
        conditionCounts[a] > conditionCounts[b] ? a : b
      );

      setWeather({
        ...data,
        avgTemp,
        avgHumidity,
        avgWindSpeed,
        dominantCondition,
      });
      setForecast(forecastData.list);
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    }
  };

  const addWeatherData = async () => {
    if (!weather) {
      console.error("Weather data is not available");
      return;
    }
  
    const weatherData = {
      city: weather.name,
      country: weather.country,
      lat: weather.lat,
      lon: weather.lon,
      date: new Date().toISOString(), 
      summary: {
        avg_temp: weather.avgTemp,
        max_temp: weather.temp_max, 
        min_temp: weather.temp_min, 
        avg_humidity: weather.avgHumidity,
        avg_wind_speed: weather.avgWindSpeed,
        dominant_condition: weather.dominantCondition,
        icon: `http://openweathermap.org/img/wn/${weather.icon}@2x.png` 
      },
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/weather/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weatherData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add weather data");
      }
  
      const result = await response.json();
      console.log("Weather data added:", result);
    } catch (error) {
      console.error("Error adding weather data:", error.message);
    }
  };
  

  const fetchWeatherDataFromDb = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/weather/fetch");
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }

      const data = await response.json();
      setWeatherDataList(data);
      setShowPopup(true); 
    } catch (error) {
      toast.error(`Error fetching saved weather data: ${error.message}`);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const handleAddWeatherData = () => {
    addWeatherData(); 
  };
  

  return (
    <div
      className={`mx-auto py-5 px-32 bg-gradient-to-br from-cyan-600 to-blue-700`}
    >
      <TopButton setQuery={setQuery} />
      <Input
        query={query}
        setUnits={setUnits}
        setQuery={setQuery}
        addWeatherDataToDb={handleAddWeatherData}
        fetchWeatherDataFromDb={fetchWeatherDataFromDb}
      />
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
      <WeatherPopup
        weatherDataList={weatherDataList}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </div>
  );
};

export default App;
