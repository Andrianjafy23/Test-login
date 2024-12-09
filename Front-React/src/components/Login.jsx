import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import login from '../assets/login.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou masquer le mot de passe
  const [username, setUsername] = useState(''); // État pour l'utilisateur
  const [password, setPassword] = useState(''); // État pour le mot de passe
  const [error, setError] = useState(''); // État pour afficher un message d'erreur
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialisation de l'erreur avant chaque tentative de connexion

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        // Si la réponse est OK, on redirige l'utilisateur vers le tableau de bord
        if (response.ok) {
            localStorage.setItem('token', data.token);  // Sauvegarde du token dans localStorage
            navigate('/dashboard');  // Redirection vers /dashboard après une connexion réussie
        } else {
            setError(data.message || 'Erreur inconnue');  // Affichage du message d'erreur de l'API
        }
    } catch (err) {
        setError('Erreur de connexion au serveur.');  // Gestion d'une erreur réseau ou autre
    }
  };

  // Fonction pour alterner la visibilité du mot de passe
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

      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error">{error}</p>} 

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
            type={showPassword ? 'text' : 'password'} // Affiche ou cache le mot de passe selon l'état
            id="password"
            className='log'
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état du mot de passe
          />
        </div>

        <div className="password-toggle">
          <input
            type="checkbox"
            id="show-password"
            className="show-password"
            checked={showPassword}
            onChange={togglePasswordVisibility} // Changement de visibilité du mot de passe
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
