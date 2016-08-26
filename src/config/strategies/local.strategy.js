var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
   passport.use(new LocalStrategy({
         usernameField: 'userName',
         passwordField: 'password'
      },
      function(username, password, done) {
         var user = {
            username: username,
            password: password
         };
         done(null, user);
      }
   ));
};
