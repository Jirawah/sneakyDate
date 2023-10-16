const cors = require('cors');
app.use(cors());

import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';

// Fonction d'initialisation de la configuration de Passport
function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      if (await compare(password, user.password)) {

        return done(null, user);
      } else {

        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {

      return done(e);
    }
  };

  // Indique à Passport d'utiliser la stratégie locale avec l'email comme champ d'identifiant
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}


export default initialize;