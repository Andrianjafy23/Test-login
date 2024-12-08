
import pkg from 'pg';
import bcrypt from 'bcrypt';

const { Client } = pkg;

const cl = new Client({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  password: '1508',
  database: 'login'
});

const addUser = async (email, password) => {
  try {
    // Connexion à la base de données
    await cl.connect();

    // Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    console.log('Mot de passe haché:', hashedPassword);

    // Insérer l'utilisateur dans la base de données
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    await cl.query(query, [email, hashedPassword]);

    console.log('Utilisateur ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', err.message);
  } finally {
    // Déconnexion de la base de données
    await cl.end();
  }
};

// Remplacez par les informations d'identification souhaitées
const email = 'Users';
const password = 'lazaniaina2310'; // Remplacez par le mot de passe souhaité

addUser(email, password);
