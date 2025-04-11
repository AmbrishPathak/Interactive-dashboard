// Example: src/components/LanguagePieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material'; // Optional MUI styling

ChartJS.register(ArcElement, Tooltip, Legend);

function LanguagePieChart({ chartData }) {
  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
      return <Typography>No language data to display.</Typography>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Languages by Repo Count',
      },
    },
  };

  return (
      <Box sx={{ position: 'relative', margin: 'auto', width:'80%', maxWidth: '400px' }}>
         <Pie data={chartData} options={options} />
      </Box>
  );
}

export default LanguagePieChart;