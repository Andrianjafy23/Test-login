
import bcrypt from 'bcrypt'; // Assurez-vous que l'environnement supporte les modules ES6

// Hachage du mot de passe
const password = 'lazaniaiana2310'; // Le mot de passe à hacher
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Erreur lors du hachage du mot de passe:', err);
    return;
  }

  // Affichez le mot de passe haché
  console.log('Mot de passe haché:', hash);

  // Comparaison du mot de passe reçu avec le hachage
  const passwordReceived = 'lazaniaiana2310'; // Le mot de passe que vous avez reçu
  const passwordHash = hash; // Utilisez le hachage généré pour la comparaison

  bcrypt.compare(passwordReceived, passwordHash, (err, result) => {
    if (err) {
      console.error('Erreur lors de la comparaison:', err);
      return;
    }
    if (result) {
      console.log('Mot de passe correct');
    } else {
      console.log('Mot de passe incorrect');
    }
  });
});
