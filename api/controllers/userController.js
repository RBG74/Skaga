var mongoose = require('mongoose');
var User     = require('../models/user');
var jwt      = require('jsonwebtoken');
var config   = require('../config');

exports.create = function(req, res, next) {
  console.log(req.body);
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
      if(err){
        return next(err);
      }
      res.json(user);
  });
};

exports.read_all = function(req, res, next) {
  User.find({}, function(err, users) {
    if(err){
      return next(err);
    }
    res.json(users);
  });
};

exports.update_password = function(req, res, next) {
  if(typeof obj.foo !== req.body.newpassword)
    var new_password = req.body.newpassword;
  else
    return res.json({success: false, message: "The newpassword parameter is required."});
  
  var user = new User(req.decoded._doc);
  user.password = new_password;
  user.isNew = false;

  user.save(function(err, user) {
      if(err){
        return next(err);
      }
      res.json(user);
  });
};

exports.delete_one = function(req, res, next) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function(err,data){
    if(err){
      return next(err);
    }
    res.json({success: true, message: "The user was sucessfully deleted."});
  });
};


exports.authenticate = function(req, res, next) {
  User.findOne(
    { username: req.body.username },
    function(err, user) {
      if(err){
        return next(err);
      }
      if(!user){
        res.json({ success: false, message: 'Authentication failed. User not found.'});
      } else {

        if(!user.validPassword(req.body.password)){
          res.json({ success: false, message: 'Authentication failed. Wrong password.'});
        } else {
          var token = jwt.sign(user, config.secret, {
            expiresIn: 60*60*24 // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'Your token is valid for the next 24 hours.',
            token: token
          });
        }
      }
    }
  )
};