const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
const session = require('express-session')
const hbs = require('hbs')
const path = require('path');
const configDB = require('./config/database.js')

//===DB CONNECT===
mongoose.connect(configDB.url) //This is how to get field from json export
/*setInterval(testing, 300)
function testing() {
  console.log(mongoose.connection.readyState)
}*/

//===BASIC SETTINGS===
app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'hbs')
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))

//===PUBLIC FOR CSS===
app.use(express.static(path.join(__dirname + '/public')))

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
const passportCfg = require('./config/passport')(passport);
const routes = require("./app/routes.js")(app,passport,hbs)
const hbsCfg = require("./config/hbs.js")(app,hbs)

//===LAUNCH===
app.listen(app.get('port'))
console.log(`Running on 0.0.0.0/${app.get('port')}`)




//BASIC LOADING OF hbs
// app.get("/", function(req, res) {
//     res.render('index', { title: 'Hey', message: 'Hello there!'})
// });
