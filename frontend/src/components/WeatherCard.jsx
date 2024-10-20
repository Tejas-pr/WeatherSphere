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
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-black bg-black bg-opacity-50"
      >
        {/* Fixed close button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="fixed top-4 right-4 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 z-10"
          onClick={() => setShowPopup(false)}
        >
          Close
        </motion.button>

        <div className="bg-white p-5 rounded-lg shadow-lg max-w-4xl max-h-3/4 overflow-y-auto w-full">
          <h2 className="text-2xl mb-4">Saved Weather Data</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            {weatherDataList.map((data, index) => (
              <div
                key={index}
                className="border p-1 rounded-lg shadow-sm w-full max-w-[200px]"
              >
                <h3 className="font-bold mb-2">
                  {data.city}, {data.country}
                </h3>
                <p>
                  Avg Temperature:<b> {data.summary.avg_temp} °C</b>
                </p>
                <p>
                  Avg Humidity:<b>{data.summary.avg_humidity}</b> %
                </p>
                <p>
                  Avg Wind Speed: <b>{data.summary.avg_wind_speed}</b> m/s
                </p>
                <p>
                  Avg Condition: <b>{data.summary.dominant_condition}</b>
                </p>
                <p>
                  Date:{" "}
                  {new Date(data.date).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => handleDeleteWeatherData(data._id)}
                  className="px-4 py-2 mt-2 text-white bg-red-600 rounded-full"
                >
                  Delete
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default WeatherPopup;
