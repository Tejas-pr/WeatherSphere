import React from "react";

const Forecast = ({ title, data }) => {
  if (!data || data.length === 0) {
    return <p>No forecast data available.</p>; // Updated loading check
  }

  // Use slice to get the first 6 items from the data array
  const forecastData = data.slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {forecastData.map((d, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <p className="font-light text-sm">{d.dt_txt}</p>
            <img
              src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
              alt="weather-icon"
              className="w-12 my-1"
            />
            <p className="font-sma">{`${d.main.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
