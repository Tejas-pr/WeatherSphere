import React from "react";

const WeatherPopup = ({ weatherDataList, showPopup, setShowPopup }) => {
  if (!showPopup) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-black bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl mb-4">Saved Weather Data</h2>
        <button
          className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherPopup;
