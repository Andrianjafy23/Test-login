// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configurer la connexion à la base de données PostgreSQL
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  password: '1508',
  database: 'login'
});

// Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Accès interdit' });
    }
    jwt.verify(token, 'lazaniaiana2310', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = user;
        next();
    });
};

// Route de connexion
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, 'lazaniaiana2310', { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur du serveur' });
    }
});

// Page sécurisée
app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenue sur le tableau de bord sécurisé', user: req.user });
});

// Démarrage du serveur
app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});
