var express    = require('express');
var app        = express();
var jwt        = require('jsonwebtoken');
var bodyParser = require('body-parser');

var config = require('./config');
var utility = require('./utility');

//debug = config.debug;
debug = false;

/* Database connection */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

utility.createAdmin();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Routes */
app.use(utility.handleLog);

var users = require('./routes/userRoutes');
app.use('/users', users);

/* Error handling */
app.use(function(err, req, res, next) {
    if(err){
        res.status(err.status||500).send({ 
            success: false, 
            err
        });
        console.log("We no good, the error was returned.");
    } else {
        console.log("We good");
    }
});

var port = process.env.PORT || 3000;
app.listen(port);