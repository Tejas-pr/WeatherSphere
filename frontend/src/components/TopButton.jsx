import React from "react";
import { motion } from "framer-motion";

const TopButton = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      name: "Bangalore",
    },
    {
      id: 2,
      name: "Delhi",
    },
    {
      id: 3,
      name: "Mumbai",
    },
    {
      id: 4,
      name: "Chennai",
    },
    {
      id: 5,
      name: "Kolkata",
    },
    {
      id: 6,
      name: "Hyderabad",
    },
  ];
  return (
    <>
      <div className="flex justify-around items-center my-1">
        {cities.map((city) => (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            key={city.id}
            onClick={() => setQuery({ q: city.name })}
            className="text-lg font-medium px-3 py-2 rounded-md"
          >
            {city.name}
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default TopButton;
