const cors = require('cors');
app.use(cors());

// Importe la stratégie locale de la librairie passport
import { Strategy as LocalStrategy } from 'passport-local';

// Importe la librairie bcrypt pour le hachage des mots de passe
import { compare } from 'bcrypt';

// Fonction d'initialisation de la configuration de Passport
function initialize(passport, getUserByEmail) {

  // Cette fonction est utilisée pour authentifier un utilisateur à l'aide de son email et de son mot de passe
  const authenticateUser = async (email, password, done) => {

    // Récupère l'utilisateur à partir de son email
    const user = await getUserByEmail(email);

    // Si l'utilisateur n'existe pas, retourne une erreur indiquant qu'il n'y a pas d'utilisateur avec cet email
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      // Si l'utilisateur existe, compare le mot de passe fourni avec le mot de passe haché dans la base de données
      if (await compare(password, user.password)) {
        // Si le mot de passe est correct, retourne l'utilisateur
        return done(null, user);
      } else {
        // Sinon, retourne une erreur indiquant que le mot de passe est incorrect
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      // Si une exception est levée lors de la comparaison, la retourne
      return done(e);
    }
  };


  // Indique à Passport d'utiliser la stratégie locale avec l'email comme champ d'identifiant
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  // Sérialise l'utilisateur pour le stocker dans une session. Ici, nous stockons juste l'ID de l'utilisateur
  passport.serializeUser((user, done) => done(null, user.id));

  // Désérialise l'utilisateur à partir de son ID pour récupérer les détails de l'utilisateur lors de chaque requête
  passport.deserializeUser((id, done) => {
    // NOTE : la fonction getUserById n'est pas définie dans ce code. Elle devrait être fournie lors de l'initialisation.
    return done(null, getUserById(id));
  });
}

// Exporte la fonction d'initialisation pour pouvoir l'utiliser dans d'autres parties de l'application
export default initialize;