'use strict';

const express = require('express');
const path = require('path');
const log4js = require('log4js');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
const cors = require('cors');
const corsConfig = require('config').cors;
const parseCors = require('./utils/parseCors');
const session = require('express-session');
const compression = require('compression');

const app = express();
module.exports = app;

const router = require('./routes');

const appEnv = app.get('env');

app.set('view engine', 'ejs');

app.use(cors(parseCors(corsConfig)));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(log4js.connectLogger(log4js.getLogger('access'), {
  level: 'auto',
  format: ':remote-addr :method :url :response-time'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret: 'careerfrog17'
}));
app.use(compression());

// env setup
if (appEnv === 'development') {
  app.use(lessMiddleware(`${__dirname}/public`));
  app.set('views', path.join(__dirname, 'views'));
} else {
  app.set('views', path.join(__dirname, 'rev/views'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res) => {
  if (req.xhr) {
    res.status(404).end();
  } else {
    res.render('404');
  }
});

// error handlers

// development error handler
// will print stacktrace
if (appEnv === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    const data = {
      message: err.message,
      error: err
    };
    if (req.xhr) {
      res.json(data);
    } else {
      res.render('error', data);
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  const data = {
    message: err.message,
    error: {}
  };
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('error', data);
  }
});