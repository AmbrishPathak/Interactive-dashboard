// src/components/PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ chartData, title }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: title,
        data: chartData.data,
        backgroundColor: chartData.backgroundColors, // Array of colors
        borderWidth: 1,
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
  };

  return <Pie data={data} options={options} />;
};

export default PieChartComponent;