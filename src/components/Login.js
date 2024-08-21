// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement your authentication logic here
    // For example, redirect to Azure AD B2C login or authenticate with an API
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" required />
        </label>
        <label>
          Password:
          <input type="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
