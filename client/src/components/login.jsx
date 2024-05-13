import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Assurez-vous que c'est bien importé

function Login() {
  const navigate = useNavigate();  // Correctement instancié
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Réinitialiser l'erreur

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token',data.token);
      localStorage.setItem('role',data.role); // Stocker le token dans localStorage
      console.log('Login Successful:');
       // Ajoutez cela juste après avoir reçu la réponse pour voir ce qui est retourné


      // Redirection basée sur le rôle de l'utilisateur
      if (data.user && data.user.role === 'admin') {
        navigate('/admin/dashboard');  // Rediriger vers le tableau de bord admin
      } else {
        navigate('/');  // Rediriger vers la page d'accueil pour les utilisateurs normaux
      }
    } else {
      throw new Error(data.message || 'Failed to login');
    }
  } catch (error) {
    setError(error.message);
  }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
