var jwt = require('jsonwebtoken');
var config   = require('../config');

exports.isTokenValid = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, config.secret, function(err, decoded){
            if(err){
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}