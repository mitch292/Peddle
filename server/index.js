const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passportSetup = require('./helpers/passport-setup');
const dbConfirmation = require('../db/index').dbConfirmationMessage; // db connection confirmation message
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const {session} = require('../config');

//Routes
const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/loginRoutes');
const sellEntryRoutes = require('./routes/sellEntryRoutes');
const notifRoutes = require('./routes/notifications');
const listingsRoutes = require('./routes/listingsRoutes');
const usersRoutes = require('./routes/usersRoutes');

require('./helpers/bearerAuthSetup');
require('./helpers/googleAuthSetup');
require('./helpers/facebookAuthSetup');


const db = require('./models/models');
const signupRoutes = require('./routes/signupRoutes');

const app = express();

//Middleware
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  keys: [session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/login', loginRoutes);
app.use('/sellEntry', sellEntryRoutes);
app.use('/notifs', notifRoutes);
app.use('/signup', signupRoutes);
app.use('/l', listingsRoutes);
app.use('/users', usersRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


let port = process.env.PORT || 3000;

dbConfirmation();

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

exports.app = app;