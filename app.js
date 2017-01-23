const express = require('express');
const hbs = require('hbs');
const app = express()

app.set('port', (process.env.PORT || 3000))
app.set('views', __dirname + '/views')

//SETUP hbs
app.set('view engine', 'hbs')
app.engine('hbs', hbs.__express)

const routes = require("./public/config/routes.js")(app);
const hbs_config = require("./public/config/hbs.js")(app);

app.listen(app.get('port'))
console.log(`Running on 0.0.0.0/${app.get('port')}`)
