const LocalStrategy = require('passport-local').Strategy
const User = require('../app/models/user.js')

module.exports = (passport) => {
  // === SETUP ===
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
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
        //Sends data back to server (need for mongoose to work)
        process.nextTick(() => {
                //USER here calls mongoose from model
          User.findOne({ 'local.email' :  email }, (err, user) => {
            if (err) {
                return done(err)
            } else if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
            } else {
                //Make a new user
                var newUser             = new User()
                newUser.local.email     = email
                newUser.local.password  = newUser.generateHash(password)
                newUser.save((err) => {
                    if (err) {
                        throw err
                    }
                    return done(null, newUser)
                })
            }
        })
        })
    }))

    // =====================================
    // LOCAL LOGIN ========================
    // =====================================
    passport.use('local-login', new LocalStrategy(
    {
        usernameField           : 'email',
        passwordField           : 'password',
        passReqToCallback       : true
    },
    (req, email, password, done) => {
        User.findOne({ 'local.email' : email}, (err, user) => {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user found'))
          }
          if (! user.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'))
          }
          return done(null, user)
        })
    }
    ))
  }
