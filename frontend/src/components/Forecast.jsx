import React from "react";
import { motion } from "framer-motion";

const Forecast = ({ title, data }) => {
  if (!data || data.length === 0) {
    return <p>No forecast data available.</p>; // Updated loading check
  }

  // Use slice to get the first 6 items from the data array
  const forecastData = data.slice(0, 8);

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 1.25,
      ease: [0, 0.71, 0.2, 1.01]
    }}
    >
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div 
        
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {forecastData.map((d, index) => (
          <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.3,
          ease: [0, 0.71, 0.2, 1.01]
        }}
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <motion.p initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.35,
          ease: [0, 0.71, 0.2, 1.01]
        }} className="font-light text-sm">{d.dt_txt}</motion.p>
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.4,
                ease: [0, 0.71, 0.2, 1.01]
              }}
              src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
              alt="weather-icon"
              className="w-12 my-1"
            />
            <motion.p initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.45,
          ease: [0, 0.71, 0.2, 1.01]
        }}  className="font-sma">{`${d.main.temp.toFixed()}°`}</motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
