var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (mongoConnect) => {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function(username, password, done) {
            mongoConnect(function(db) {
                var collection = db.collection('users');
                collection.findOne({ username: username },
                    function(err, results) {
                        db.close();
                        
                        if (err) {
                            console.log(err);
                            done(null, false);
                            return;
                        }
                        if (results && results.password === password) {
                            var user = results;
                            done(null, user);
                        } else {
                            done(null, false, { message: "Username or password does not match" });
                        }
                    }
                 );
            });
        }
    ));
};
