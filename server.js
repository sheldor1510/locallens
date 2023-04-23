const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const { auth } = require('express-openid-connect');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');

dotenv.load();

const app = express();

app.use(expressLayouts)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

const server = app.listen(port, () => {
    console.log(`Listening on ${config.baseURL}`);
});

const io = require('socket.io')(server, { cors: true, origins: '*:*' });

io.on('connection', (socket) => {
  console.log("a user connected");
  socket.on('disconnect', () => {
    console.log("a user disconnected");
  });

  socket.on('chat message', (message) => {
    console.log("Message: " + message);
    io.emit('chat message', message);
  });
});