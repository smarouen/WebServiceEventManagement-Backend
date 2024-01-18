const express = require('express'); //framework 
const app = express(); //app used in the express framework
const bodyparser = require('body-parser') // modify the data to json type
const authRoute = require('./routes/auth.route') // service of authentfication located in the routes directory
const eventRoute = require('./routes/event.route') // service of books located in the routes directory
require('dotenv').config(); // where we store our sensitive data
const mongoose = require('mongoose'); // ODM to connect to our MongoDB database
const checkAuth = require('./middleware/checkAuth'); // Where we used JWT (json web token) to verify authentification

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

mongoose.connect( process.env.BD_LINK_TO_CONNECT)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


app.use('/auth', authRoute)
app.use('/event', checkAuth, eventRoute)

module.exports = app
