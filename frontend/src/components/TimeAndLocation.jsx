import React from "react";
import { motion } from "framer-motion";
const TimeAndLocation = ({weather: {formattedLocalTime, name, country} }) => {
  // console.log("Weather Data: ", { formattedLocalTime, name, country });
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <div className="flex items-center justify-center my-6 mt-10">
          <p className="text-xl font-extralight">{formattedLocalTime}</p>
        </div>

        <div className="flex items-center justify-center my-3">
          <p className="text-3xl font-medium">{`${name}, ${country}`}</p>
        </div>
      </motion.div>
    </>
  );
};

export default TimeAndLocation;
