var express      = require('express');
    path         = require('path'),
    favicon      = require('static-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    session      = require("express-session"),
    dotenv       = require("dotenv"),
    Auth0Strategy= require("passport-auth0"),
    bodyParser   = require('body-parser');


var passport        = require("passport"),
    Auth0Stretegy   = require("passport-auth0");

// The Twelve Factory Methodology
dotenv.load();

var routes = require('./routes/index'),
    user   = require('./routes/user'),
    profile= require('./routes/profile');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.METHOD+'://'+process.env.HOST+':'+process.env.PORT+'/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    console.info("Auth0Strategy ", accessToken, extraParams );
    console.info("Profile", profile);
    return done(null, profile );
  });


passport.use( strategy );

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//-- Instanciating express http web-server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon( path.join(__dirname,"public/images/blackrock.ico")));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// Session must be set before passport.initialize and passport.session
app.use(session({
    secret:'HooSecret',
    resave:true,
    saveUninitialized:true
}));

app.use( passport.initialize() );
app.use( passport.session() );
app.use( express.static(path.join(__dirname, 'public')) );

//-- Serving bootstrap stuff
app.use( '/bootstrap',    express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use( '/font-awesome', express.static(path.join(__dirname, 'node_modules/font-awesome/css')));
app.use( '/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));

app.use('/', routes);
app.use("/profile", profile);
app.use('/user', user);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers
// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
