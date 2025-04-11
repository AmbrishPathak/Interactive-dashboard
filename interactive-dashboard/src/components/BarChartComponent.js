// src/components/BarChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = ({ chartData, title }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: title,
        data: chartData.data,
        backgroundColor: 'rgba(54, 162, 235, 0.8)', // Example color
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: title, // Assuming data represents stars or forks
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartComponent;