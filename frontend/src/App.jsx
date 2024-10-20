import React, { useEffect, useState } from "react";
import TopButton from "./components/TopButton";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeatherPopup from "./components/WeatherCard";
import AlertModal from "./components/Alert";
import { motion } from "framer-motion";

const App = () => {
  const [query, setQuery] = useState({ q: "Bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

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

      try {
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
        toast.error(`Please re-load to fetch forcast data}`);
      }
    } catch (error) {
      toast.error(`Please re-load to fetch weather data`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(getWeather, 300000);
    return () => clearInterval(intervalId);
  }, [query, units]);

  const addWeatherData = async () => {
    if (!weather) {
      return;
    }

    const weatherData = {
      city: weather.name,
      country: weather.country,
      lat: weather.lat,
      lon: weather.lon,
      date: new Date().toISOString(),
      summary: {
        avg_temp: weather.avgTemp.toFixed(),
        max_temp: weather.temp_max,
        min_temp: weather.temp_min,
        avg_humidity: weather.avgHumidity.toFixed(),
        avg_wind_speed: weather.avgWindSpeed.toFixed(),
        dominant_condition: weather.dominantCondition,
        icon: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
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
        console.log(errorData.error || "Failed to add weather data");
      }

      const result = await response.json();
      toast.success("Weather data added successfully!");
    } catch (error) {
      toast.error(`Limit exceeded: Delete a summary to add more.`);
    }
  };

  const deleteWeatherData = async (id) => {
    try {
      console.log(id);

      const response = await fetch(
        `http://localhost:3000/api/weather/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete weather data");
      }

      const result = await response.json();
      toast.success("Weather data deleted successfully!");

      setWeatherDataList((prevData) =>
        prevData.filter((data) => data._id !== id)
      );
    } catch (error) {
      toast.error(`Error in deleting weather data`);
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
      toast.error(`Error in fetching saved weather data`);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const handleAddWeatherData = () => {
    addWeatherData();
  };

  const handleDeleteWeatherData = (index) => {
    deleteWeatherData(index);
  };

  const handleSetAlert = (alertData) => {
    fetch("http://localhost:3000/api/weather/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            const errorMessages = errorData.errors.map((err) => err.message).join(", ");
            throw new Error(errorMessages);
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Alert set successfully!");
        toast.success("Please wait for email notification.");
      })
      .catch((error) => {
        let errorMessage = error.message || "Try again !!";
        if (errorMessage.includes("email")) {
          errorMessage = "Please enter a valid email.";
        } else if (errorMessage.includes("city")) {
          errorMessage = "Please enter a valid city.";
        } else if (errorMessage.includes("threshold")) {
          errorMessage = "Please enter a valid temperature threshold.";
        }
        toast.error(errorMessage);
      });
  };
  
  return (
    <div className="mx-auto py-5 px-32 bg-gradient-to-br">
      <TopButton setQuery={setQuery} />
      <Input
        query={query}
        setUnits={setUnits}
        setQuery={setQuery}
        addWeatherDataToDb={handleAddWeatherData}
        fetchWeatherDataFromDb={fetchWeatherDataFromDb}
      />
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className=" text-white font-bold py-2 px-4 border border-slate-300 rounded-xl"
        onClick={() => setShowAlertModal(true)}
      >
        Set Alert
      </motion.button>
      {weather ? (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          {forecast ? (
            <Forecast title="3 hour step forecast" data={forecast} />
          ) : (
            <p>Loading forecast...</p>
          )}
        </>
      ) : (
        <p className="flex items-center justify-center m-80">Loading data...</p>
      )}
      <ToastContainer autoClose={1000} hideProgressBar={true} theme="dark" />
      <WeatherPopup
        handleDeleteWeatherData={handleDeleteWeatherData}
        weatherDataList={weatherDataList}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
      <AlertModal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onSubmit={handleSetAlert}
      />
    </div>
  );
};

export default App;
