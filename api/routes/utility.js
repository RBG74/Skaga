var jwt = require('jsonwebtoken');
var config   = require('../config');

exports.isTokenValid = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, config.secret, function(err, decoded){
            if(err){
                return next(err);
            } else {
                if(req.wantAdminToken){
                    if(decoded._doc.isAdmin){
                        req.decoded = decoded;
                        next();
                    } else {
                        return res.status(403).send({
                            success: false,
                            message: 'You need an admin token.'
                        })
                    }
                } else {
                    req.decoded = decoded;
                    next();
                }
            }
        })
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
};

exports.isTokenAdmin = function(req, res, next){
    req.wantAdminToken = true;
    exports.isTokenValid(req, res, next);
};