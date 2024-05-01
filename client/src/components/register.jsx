// src/components/Register.jsx

import React, { useState } from 'react';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      console.log('Registration Successful:', data);
      // Redirect the user or clear the form here
      // For example, clear form:
      setUserData({ username: '', email: '', password: '' });
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={userData.username} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
