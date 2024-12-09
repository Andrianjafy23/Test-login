require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Route de connexion
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });

        // Utilisation de l'ID de l'utilisateur pour créer le token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// Middleware d'authentification
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token manquant.' });

    try {
        console.log('Token reçu:', token);  // Log du token pour vérification
        // Retirer "Bearer " du token
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error('Erreur de vérification du token:', err.message);  // Journalisation d'erreur
        return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }
};

// Route protégée
app.get('/api/protected', authenticate, (req, res) => {
    res.json({ message: 'Accès autorisé.', user: req.user });
});

module.exports = app; 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
