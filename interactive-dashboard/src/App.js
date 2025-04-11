// src/App.js
import React, { useState, useEffect } from 'react';
import LineChartComponent from './components/LineChartComponent'; // Assuming you have this
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import './App.css';

function App() {
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch('https://api.github.com/repos/facebook/react')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setRepoData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!repoData) {
    return <div>No data available.</div>;
  }

  // Prepare data for the charts
  const watchersData = {
    labels: ['Watchers'],
    data: [repoData.subscribers_count],
  };

  const starsForksData = {
    labels: ['Stars', 'Forks'],
    data: [repoData.stargazers_count, repoData.forks_count],
  };

  // Example language data (you might need to fetch this differently or it might not be directly available in this format)
  const languagesData = {
    labels: ['JavaScript', 'HTML', 'CSS', 'Other'], // Example labels
    data: [60, 20, 10, 10], // Example percentages
    backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Example colors
  };

  return (
    <div className="App">
      <h1>GitHub Repository Stats</h1>
      {repoData.full_name && <h2>{repoData.full_name}</h2>}

      <div className="charts-container">
        <div className="chart-item">
          <LineChartComponent chartData={watchersData} title="Watchers Count" />
        </div>
        <div className="chart-item">
          <BarChartComponent chartData={starsForksData} title="Stars and Forks" />
        </div>
        {/* Conditionally render PieChart if you have language data */}
        {languagesData.labels && languagesData.labels.length > 0 && (
          <div className="chart-item">
            <PieChartComponent chartData={languagesData} title="Languages Used" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;