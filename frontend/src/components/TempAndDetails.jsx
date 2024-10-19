import React from "react";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { TbAlarmAverage } from "react-icons/tb";
import { BiArrowFromBottom } from "react-icons/bi";
import { motion } from "framer-motion";

const TempAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    avgTemp,
    avgHumidity,
    avgWindSpeed,
    dominantCondition,
  },
  units,
}) => {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "Km/h" : "m/s"}`,
    },
  ];
  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
    {
      id: 5,
      Icon: TbAlarmAverage,
      title: "Avg Temp", 
      value: `${avgTemp.toFixed()}°`, 
    },
    {
      id: 6,
      Icon: BiSolidDropletHalf,
      title: "Avg Humidity",
      value: `${avgHumidity.toFixed()}%`,
    },
    {
      id: 7,
      Icon: FiWind,
      title: "Avg Wind Speed",
      value: `${avgWindSpeed.toFixed()} ${units === "metric" ? "Km/h" : "m/s"}`,
    },
    {
      id: 8,
      Icon: BiArrowFromBottom,
      title: "Dominant Condition",
      value: `${dominantCondition}`,
    },
  ];
  return (
    <>
      <motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="flex items-center justify-center py-6 text-xl text-cyan-300"
        >
          <p className="">{details}</p>
        </motion.div>
        <div className="flex flex-row justify-between items-center py-3">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            src={icon}
            alt="Weather icon"
          />

          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="text-5xl"
          >
            {`${temp.toFixed()}`}°
          </motion.p>

          {/* vertical  */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex flex-col space-y-3 items-start"
          >
            {verticalDetails.map(({ id, Icon, title, value }) => (
              <div
                key={id}
                className="flex font-light test-sm items-center justify-center"
              >
                <Icon size={18} className="mr-1 " />
                {`${title} :`}
                <span className="font-medium ml-1">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
        {/* harizontal */}
        <div className="grid grid-cols-4 gap-4text-sm py-3 mt-5 ">
          {horizontalDetails.map(({ id, Icon, title, value }) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              key={id}
              className="flex flex-row items-center p-4"
            >
              <Icon size={30} />
              <p className="font-light ml-1">
                {`${title} :`}
                <span className="font-medium ml-1">{value}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default TempAndDetails;
