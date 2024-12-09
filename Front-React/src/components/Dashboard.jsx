// Importation des modules nécessaires
import React, { useState, useEffect } from 'react'; // React et ses hooks
import axios from 'axios'; // Librairie pour les requêtes HTTP
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation dans React Router

// Définition du composant Dashboard
const Dashboard = () => {
    // Déclaration des états pour gérer le message et l'état de chargement
    const [message, setMessage] = useState(''); // Stocke le message du backend ou une erreur
    const [loading, setLoading] = useState(true); // Indique si la page est en cours de chargement
    const navigate = useNavigate(); // Hook pour la navigation

    // useEffect pour exécuter une logique lors du montage du composant
    useEffect(() => {
        // Récupère le token depuis le localStorage
        const token = localStorage.getItem('token');

        console.log('Token récupéré:', token); // Affiche le token pour déboguer

        // Si aucun token n'est présent, redirige l'utilisateur vers la page de connexion
        if (!token) {
            navigate('/login'); // Redirection
            setLoading(false); // Arrête l'état de chargement
        } else {
            // Si un token est présent, envoie une requête au backend pour le valider
            axios.get('http://localhost:5000/api/protected', {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajoute le token au header de la requête
                },
            })
            .then(response => {
                // Si la requête réussit, récupère le message du backend
                console.log(response.data); // Affiche la réponse pour déboguer
                setMessage(response.data.message); // Met à jour le message affiché
                setLoading(false); // Fin du chargement
            })
            .catch(error => {
                // En cas d'erreur, gère la réponse
                console.error('Erreur:', error.response ? error.response.data : error.message);
                setMessage('Erreur de validation du token.'); // Affiche un message d'erreur
                setLoading(false); // Fin du chargement

                // Si l'erreur est une 401 (non autorisé), redirige vers la page de connexion
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirection
                }
            });
        }
    }, [navigate]); // Dépendance pour que useEffect réexécute lorsque `navigate` change

    // Si le composant est encore en chargement, affiche un message de chargement
    if (loading) {
        return <div>Chargement...</div>;
    }

    // Rendu du composant une fois que la validation est terminée
    return (
        <div>
            <h2>Tableau de bord sécurisé</h2>
            <p>{message}</p> {/* Affiche le message récupéré ou un message d'erreur */}
        </div>
    );
};

// Exportation du composant pour l'utiliser dans d'autres parties de l'application
export default Dashboard;
