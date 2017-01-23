const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const hbs = require('hbs')
const configDB = require('./config/database.js')

//===BASIC SETTINGS===
app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'hbs')

//===PASSPORT===

app.use(session({
  secret: 'whenitistimethatswhenyoustrike',
  resave: 'true',
  saveUninitialized: 'true'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//===IMPORTING===
const routes = require("./app/routes.js")(app,passport,hbs)
const hbsCfg = require("./config/hbs.js")(app,hbs)

//===LAUNCH===
app.listen(app.get('port'))
console.log(`Running on 0.0.0.0/${app.get('port')}`)




//BASIC LOADING OF hbs
// app.get("/", function(req, res) {
//     res.render('index', { title: 'Hey', message: 'Hello there!'})
// });
