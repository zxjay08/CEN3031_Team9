import React, { useState } from 'react';
import "assets/css/demo.css";
import logo from "../logo-white.svg";

function Login() {
  // State variables to store username, password, and user type
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const [hasId, setHasId] = useState(false); // Indicates whether the user has an ID

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform authentication logic
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("User Type:", userType);
    // Assuming authentication is successful, set hasId to true
    setHasId(true);
    // Reset the form
    setUsername('');
    setPassword('');
    setUserType('student'); // Reset user type to default after submission
  };

  return (
    <div className="login-container">
      <div className="black-background"></div> {/* Black background */}
      <div className="gray-background">
        <h1 className="welcome-title">Welcome to For The Student</h1>
        <div className="content">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <div className="radio-group">
              <label>User Type:</label>
              <div className="radio-options">
              <div className="radio-option">
                <input
                    type="radio"
                    id="student"
                    name="userType"
                    value="student"
                    checked={userType === 'student'}
                    onChange={() => setUserType('student')}
                />
                <label htmlFor="student">Student</label>
              </div>
              <div className="radio-option">
                <input
                    type="radio"
                    id="parent"
                    name="userType"
                    value="parent"
                    checked={userType === 'parent'}
                    onChange={() => setUserType('parent')}
                />
                <label htmlFor="parent">Parent</label>
              </div>
              <div className="radio-option">
                <input
                    type="radio"
                    id="teacher"
                    name="userType"
                    value="teacher"
                    checked={userType === 'teacher'}
                    onChange={() => setUserType('teacher')}
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
            </div>
            </div>
            {hasId ? (
                <button type="submit">Sign In</button>
            ) : (
                <>
                  <button type="button" className="login-button">Login</button>
                  <button type="button" className="signup-button">Sign Up</button>
                </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
