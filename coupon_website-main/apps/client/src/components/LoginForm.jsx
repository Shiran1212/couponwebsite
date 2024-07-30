// LoginForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 // בקובץ LoginForm.js
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const user = await response.json();
    // Save user details in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    // Redirect to dashboard or any other page
    window.location.href = '/';
  } catch (error) {
    console.log('Error:', error);
    alert('Invalid email or password. Please try again.');
  }
};


  return (
    <div>
      <br />
      <br />
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className='loginBtn' type="submit">Login</button>
        </form>
        <Link to="/signup" className="link">
          Click here to sign up for free
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
