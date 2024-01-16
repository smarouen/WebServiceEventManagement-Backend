const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser')
const authRoute = require('./routes/auth.route')
const meetRoute=require('./routes/meet.route')
const notification=require('./routes/notification.route')

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

mongoose.connect('mongodb+srv://zouinekhamine:BLWUnCuXba0kjebc@visiodb.omvjavc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


app.use('/auth', authRoute)
app.use('/meet',checkAuth,meetRoute)
app.use('/notif', notification)

module.exports = app
