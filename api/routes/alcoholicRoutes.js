var express = require('express');
var router = express.Router();

var alcoholicController = require('../controllers/alcoholicController');
var utility = require('../utility');

router.post('/:name', utility.isAuth, alcoholicController.create);
router.get('/', utility.isAuth, alcoholicController.read_all);
router.get('/:id', utility.isAuth, alcoholicController.read_one);
router.get('/user/:id', utility.isAuth, alcoholicController.read_for_auth_user);
router.delete('/:id', utility.isAuth, alcoholicController.delete_one);
router.delete('/', utility.isAuth, alcoholicController.delete_for_auth_user);

module.exports = router;