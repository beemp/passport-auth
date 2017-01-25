const LocalStrategy = require('passport-local').Strategy
const User = require('../app/models/users.js');

module.exports = (passport) => {
  // === SETUP ===
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    done(err, user)
  })

  // =====================================
  // LOCAL SIGNUP ========================
  // =====================================
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
        console.log(`got to passport`);
        //Sends data back to server (need for mongoose to work)
        process.nextTick(() => {
                //USER here calls mongoose from model
                User.findOne({ 'local.email' :  email }, (err, user) => {
            if (err)
                console.log(`err: ${err}`);
                return done(err, false, req.flash('signupMessage', err))
            if (user) {
                console.log(`existing: ${user}`);
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
            } else {
                console.log(`new: new`);
                //Make a new user
                var newUser             = new User()
                newUser.local.email     = email
                newUser.local.password  = newUser.generateHash(password)
                newUser.save((err) => {
                    if (err)
                        throw err
                    return done(null, newUser)
                })
            }
        })
        })
    }))
  }
