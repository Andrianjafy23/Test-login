const bcrypt = require('bcrypt');
const pool = require('./db');

const createTestUser = async () => {
    try {
        const hashedPassword = await bcrypt.hash('lazaniaina2310', 10); // Mot de passe "lazaniaina2310" haché
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['users', hashedPassword]);
        console.log('Utilisateur ajouté avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
    } finally {
        pool.end(); // Fermer la connexion à la base de données
    }
};

createTestUser();
