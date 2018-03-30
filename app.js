const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database);
let db = mongoose.connection;

//check connection
db.once('open', () => {
    console.log('Connected To MongoDB');  
});

//Check for db errors
db.on('error', (err) => {
    console.log(err);
});

//init app
const app = express();

//bring in Models
let Article = require('./models/article');

// Load View Engine
// app.set('views', path.join(__dirname, './views'));
app.set('views', './views')
app.set('view engine', 'pug');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, './public')));


// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator Middleware
//app.use(expressValidator(middlewareOptions));
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//Home route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err){
            console.log(err);
        }else{
            res.render('index', {
                title: 'VSU ACM'
                // articles: articles
            });
        }
    });
});

// Route Users
let users = require('./routes/users');
app.use('/users', users);
app.use(function(err, req, res, next) {});

// Route About Pages
let abouts = require('./routes/abouts');
app.use('/abouts', abouts);
app.use(function(err, req, res, next) {});

// Route Resources Pages
let resources = require('./routes/resources');
app.use('/resources', resources);
app.use(function(err, req, res, next) {});

//start server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000 ....');
});