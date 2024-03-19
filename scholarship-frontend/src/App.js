// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

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

  return (
    <div className="app-container"> {/* Add a CSS class for container styling */}
      <header>
        <h1>Secretary of Education Scholarship View</h1>
      </header>
      <main>
        <section className="scholarship-trends"> {/* Add a CSS class for section styling */}
          <h2>Scholarship Trends</h2>
          <ul>
            {trends.map(trend => (
              <li key={trend.year}>
                <strong>Year:</strong> {trend.year}, <strong>Total Students:</strong> {trend.total_students}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>
        <p>© 2024 Secretary of Education</p>
      </footer>
    </div>
  );
}

export default App;
