import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import login from '../assets/login.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/protected'); // Redirige vers une page protégée après connexion
    } catch (err) {
      setError('Nom d’utilisateur ou mot de passe incorrect');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Login">
      <div className="login-header">
        <img
          src={login}
          alt="Logo login"
          style={{
            height: '163px',
            width: '179px',
            marginBottom: '29px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
        />
      </div>

      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error-message">{error}</p>}

        <label className="lab" htmlFor="username">Nom</label>
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            id="username"
            className="log"
            placeholder="Entrez votre nom"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <label className="lab" htmlFor="password">Mot de passe</label>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="log"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="password-toggle">
          <input
            type="checkbox"
            id="show-password"
            className="show-password"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="show-password">Afficher le mot de passe</label>
        </div>

        <div className="submit-container">
          <button type="submit" className="se">Se connecter</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
