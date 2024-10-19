import React, { useRef } from "react";
import { motion } from "framer-motion";

const WeatherPopup = ({
  weatherDataList,
  showPopup,
  setShowPopup,
  handleDeleteWeatherData,
}) => {
  if (!showPopup) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-black bg-black bg-opacity-50 gap-36"
      >
        <div className="flex items-start">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() => setShowPopup(false)}
          >
            Close
          </motion.button>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg max-w-md max-h-3/4 overflow-y-auto">
          <h2 className="text-2xl mb-4">Saved Weather Data</h2>

          <ul>
            {weatherDataList.map((data, index) => (
              <li key={index} className="border-b border-gray-300 py-2">
                <h3>
                  {data.city}, {data.country}
                </h3>
                <p>Average Temperature: {data.summary.avg_temp} °C</p>
                <p>Average Humidity: {data.summary.avg_humidity} %</p>
                <p>Average Wind Speed: {data.summary.avg_wind_speed} m/s</p>
                <p>Dominant Condition: {data.summary.dominant_condition}</p>
                <p>Date: {new Date(data.date).toLocaleDateString()}</p>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => handleDeleteWeatherData(data._id)}
                  className="px-4 text-white bg-red-600 rounded-full"
                >
                  Delete
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default WeatherPopup;
