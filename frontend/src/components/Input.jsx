import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({
  setQuery,
  setUnits,
  addWeatherDataToDb,
  fetchWeatherDataFromDb,
}) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city !== "") setQuery({ q: city });
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search by city..."
          className="text-gray-600 text-xl font-light p-2 w-1/3 shadow-xl capitalize focus:outline-none rounded-full placeholder:lowercase"
        />
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <BiSearch
            size={30}
            onClick={handleSearch}
            className="cursor-pointer"
          />
        </motion.div>
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center gap-2">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-2xl font-medium"
          onClick={() => setUnits("metric")}
        >
          °C
        </motion.button>
        <p className="text-2xl font-medium mx-1">|</p>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-2xl font-medium"
          onClick={() => setUnits("imperial")}
        >
          °F
        </motion.button>
        <p className="text-2xl font-medium mx-1"> | </p>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-[15px] font-normal"
          onClick={addWeatherDataToDb}
        >
          ADD SUMMARY
        </motion.button>
        <p className="text-2xl font-medium mx-1">|</p>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-[15px] font-normal"
          onClick={fetchWeatherDataFromDb}
        >
          FETCH SUMMARY
        </motion.button>
      </div>
    </div>
  );
};

export default Input;
