import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
const Input = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city == "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setQuery({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error retrieving location: ", error.message);
          // You can also show an alert or a message to the user
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  
  return (
    <>
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
          <BiCurrentLocation
            onClick={handleLocationClick}
            size={30}
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
        </div>
      </div>
    </>
  );
};

export default Input;
