import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const TemperatureLineChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Daily Average Temperature (°C)",
        data: data.map((entry) => entry.avgTemp),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(0, 0, 0, 1)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <>
      <h2 className="mt-10">Daily Average Temperature</h2>
      <hr className=" " />
      <div className="mt-10 bg-[#d1e9f6ac] rounded-xl p-4">
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default TemperatureLineChart;
