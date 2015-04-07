/**
 *  Import express framework
 */
var express = require('express');

/**
 * Import path utils
 */
var path = require('path');

/**
 * Import morgan logger
 */
var logger = require('morgan');

/**
 * Import cookie parser
 */
var cookieParser = require('cookie-parser');

/**
 * Import request body parser
 */
var bodyParser = require('body-parser');

/**
 * Import routes.js file.
 * This file maps HTTP requests to their handlers.
 * @sa routes.setup()
 */
var routes = require('./routes');

/**
 * Import ./libs/config.js file.
 * This file imports the configuration loader 'nconf' and
 * loads config file with db connection options.
 */
var config = require('./libs/config');

/**
 * Import ./libs/mongoose.js
 */
var db = require('./libs/db');

db.init(path.join(__dirname, "models"), function (err, data) {
   if ( !err )
   {
       console.log( "All models were loaded" );
   }
});

/**
 * Create app instance
 */
var app = express();

/**
 * Setup templater options
 */
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Setup directory for static resources ( frontend files ).
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Define API request handlers
 */
var handlers = {
    courses: require('./handlers/coursesHandler'),
    degrees: require('./handlers/degreesHandler'),
    topics: require('./handlers/topicsHandler')
};

routes.setup(app, handlers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
