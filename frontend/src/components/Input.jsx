import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({ setQuery, setUnits, addWeatherDataToDb, fetchWeatherDataFromDb }) => {
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
        <BiSearch
          size={30}
          onClick={handleSearch}
          className="cursor-pointer ease-out transition hover:scale-125"
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
        <p className="text-2xl font-medium mx-1">{" "} | {" "}</p>
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={addWeatherDataToDb}
        >
          ADD 
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={fetchWeatherDataFromDb}
        >
          FETCH
        </button>
      </div>
    </div>
  );
};

export default Input;
