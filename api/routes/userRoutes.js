var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var utility = require('./utility');
  
router.post('/', userController.create);
router.get('/', utility.isTokenValid, userController.read_all);
router.patch('/updatepw', utility.isTokenValid, userController.update_password);
router.delete('/:id', utility.isTokenAdmin, userController.delete_one);

router.post('/authenticate', userController.authenticate);

module.exports = router;