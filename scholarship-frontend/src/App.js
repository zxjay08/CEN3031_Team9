import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './App.css';

function App() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8000/api/scholarship/trends');
      setTrends(response.data);
    } catch (error) {
      console.error('Error fetching scholarship trends:', error);
    }
  }


  useEffect(() => {
    function drawChart() {
      if (trends.length > 0) {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: trends.map(trend => trend.year),
            datasets: [{
              label: 'Total Students',
              data: trends.map(trend => trend.total_students),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    drawChart(); // Call drawChart function once on initial render
  }, [trends]); // Re-draw chart when trends change

  return (
    <div className="app-container">
      <header className="header">
        <h1>Secretary of Education Scholarship View</h1>
      </header>
      <main className="main">
        <section className="scholarship-trends">
          <h2>Scholarship Trends</h2>
          <ul className="trend-list">
            {trends.map(trend => (
              <li key={trend.year}>
                <strong>Year:</strong> {trend.year}, <strong>Total Students:</strong> {trend.total_students}
              </li>
            ))}
          </ul>
          <div className="chart-container">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>© 2024 Secretary of Education</p>
      </footer>
    </div>
  );
}

export default App;
