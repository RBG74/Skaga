var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var utility = require('./utility');
  
router.get('/', utility.isTokenValid, userController.list_all_users);
router.patch('/password', utility.isTokenValid, userController.edit_password);
router.post('/', userController.create_a_user);
router.post('/authenticate', userController.authenticate);

module.exports = router;