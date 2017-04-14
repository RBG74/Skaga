var mongoose = require('mongoose');
var Alcoholic     = require('../models/alcoholic');
var jwt      = require('jsonwebtoken');
var config   = require('../config');

exports.create = function(req, res, next) {
    if(debug) console.log('[debug]alcoholicController, create');

    var new_alcoholic = new Alcoholic({
        name: req.params.name,
        addedBy: req.decoded._doc._id
    });
    new_alcoholic.save(function(err, alcoholic) {
    if(err){
        return next(err);
    }
        return res.json({success: true, message: "The alcoholic was sucessfully created."});
    });
};

exports.read_all = function(req, res, next) {
  if(debug) console.log('[debug]alcoholicController, read_all');

  Alcoholic.find().populate('addedBy', 'username').exec(function(err, alcoholics) {
    if(err){
      return next(err);
    }
    if(alcoholics[0]){
      return res.json({success: true, alcoholics});
    } else {
      return res.json({success: true, message: 'There is no alcoholic.'});
    }
  });
};

exports.read_one = function(req, res, next) {
  if(debug) console.log('[debug]alcoholicController, read_one');

  var id = req.params.id;
  if(mongoose.Types.ObjectId.isValid(id)){
    Alcoholic.findById(id).populate('user', 'username').exec(function(err, alcoholic) {
      if(err){
        return next(err);
      }
      if(alcoholic){
        return res.json({success: true, alcoholic});
      } else {
        return res.json({success: true, message:'No alcoholic found with this id.'});
      }
    });
  } else {
    return res.json({sucess: false, message: 'Parameter needs to be an id.'});
  }
};

exports.read_for_auth_user = function(req, res, next) {
  if(debug) console.log('[debug]alcoholicController, read_for_auth_user');

  var userid = req.decoded._doc._id;
  if(mongoose.Types.ObjectId.isValid(id)){
    Alcoholic.find({addedBy: userid}).populate('user', 'username').exec(function(err, alcoholics) {
      if(err){
        return next(err);
      }
      if(alcoholics[0]){
        return res.json({success: true, alcoholics});
      } else {
        return res.json({success: true, message: 'There is no alcoholic for this user.'});
      }
    });
  } else {
    return res.json({sucess: false, message: 'Parameter needs to be an id.'});
  }
};

exports.delete_one = function(req, res, next) {
  if(debug) console.log('[debug]alcoholicController, delete_one');

  var id = req.params.id;
  if(mongoose.Types.ObjectId.isValid(id)){
    Alcoholic.findByIdAndRemove(id, function(err){
      if(err){
        return next(err);
      }
      return res.json({success: true, message: "The alcoholic was sucessfully deleted."});
    });
  } else {
    return res.json({sucess: false, message: 'Parameter needs to be an id.'});
  }
};

exports.delete_for_auth_user = function(req, res, next) {
  if(debug) console.log('[debug]alcoholicController, delete_for_auth_user');

  var userid = req.decoded._doc._id;
  if(mongoose.Types.ObjectId.isValid(userid)){
    Alcoholic.remove({ 'addedBy': userid }, function(err, removed){
      if(err){
        return next(err);
      } else {
        return res.json({ success: true, message: 'Your alcoholics were successfully deleted.', removed: removed.result.n });
      }
    });
  } else {
    return res.json({sucess: false, message: 'Not authentified.'});
  }
};