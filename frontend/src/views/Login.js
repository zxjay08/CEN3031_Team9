import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username,
        password,
        userType,
      });
      if (response.status === 200 && response.data.authenticated) {
        // Login successful
        navigate('/admin/dashboard', { state: { username: response.data.username } });
      } else {
        // Login failed
        setLoginFailed(true);
      }
    } catch (error) {
      // Display more specific error message based on status code
      if (error.response && error.response.status === 422) {
        console.error('Login failed: Invalid data');
      } else {
        console.error('Login failed:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="black-background"></div>
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
              {loginFailed && <p style={{ color: 'red' }}>Login Failed</p>} {/* Display login failed message */}
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
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <Link to="/admin/user-page" className="signup-button">Sign Up</Link>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
