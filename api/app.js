var express    = require('express');
var app        = express();
var jwt        = require('jsonwebtoken');
var bodyParser = require('body-parser');

var config = require('./config');

/* Database connection */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

/* Admin creation */
var User = require('./models/user');
User.findOne({ 'username': 'Admin' }, function (err, admin) {
    if(!admin){
        new User({ 
            username: 'Admin', 
            password: 'password',
            isAdmin: true 
        }).save(function(err) {
            if (err) throw err;
        });
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var users = require('./routes/userRoutes');
app.use('/users', users);

var port = process.env.PORT || 3000;
app.listen(port);