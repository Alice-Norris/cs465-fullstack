const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const User = mongoose.model('users')

passport.use(new LocalStrategy({
    usernameField: 'email' // use email as user name
  },
  (username, password, done) => {
    // find user using email
    User.findOne({ email: username }, (err, user) => {
      if(err) { return done(err); }
      // return message if username or pass are incorrect
      if(!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

