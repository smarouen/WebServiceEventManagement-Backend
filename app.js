const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser')
const authRoute = require('./routes/auth.route')
const bookRoute = require('./routes/book.route')
require('dotenv').config();
const mongoose = require('mongoose');
const checkAuth = require('./middleware/checkAuth');

app.use(cors({
  origin: '*'
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

mongoose.connect( process.env.BD_LINK_TO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


app.use('/auth', authRoute)
app.use('/book', checkAuth, bookRoute)

module.exports = app
