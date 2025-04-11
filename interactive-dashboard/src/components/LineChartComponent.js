// src/components/LineChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ chartData, title }) => {
  const data = {
    labels: chartData.labels, // Array of labels for the x-axis (e.g., time points)
    datasets: [
      {
        label: title, // Title of the dataset (e.g., "Watchers")
        data: chartData.data, // Array of data points for the y-axis
        fill: false, // Do not fill the area under the line
        backgroundColor: 'rgba(75, 192, 192, 0.8)', // Line color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        tension: 0.1, // Bezier curve tension to make the line smoother (0 for straight lines)
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive to container size
    plugins: {
      title: {
        display: true,
        text: title, // Display the title passed as a prop
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at 0
        title: {
          display: true,
          text: title, // You might want a more specific y-axis label here (e.g., "Number of Watchers")
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time', // Or a more relevant x-axis label if applicable
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartComponent;