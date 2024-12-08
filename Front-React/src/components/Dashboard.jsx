// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');  // Récupère le token depuis le localStorage
        if (!token) {
            window.location.href = '/login';  // Si aucun token, redirige vers la page de connexion
        } else {
            axios.get('/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,  // Envoie le token dans les en-têtes
                }
            })
            .then(response => {
                setMessage(response.data.message);  // Affiche le message sécurisé
            })
            .catch(error => {
                console.error(error);
                window.location.href = '/login';  // Si erreur de token, redirige vers la page de connexion
            });
        }
    }, []);

    return (
        <div>
            <h2>Tableau de bord sécurisé</h2>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;
