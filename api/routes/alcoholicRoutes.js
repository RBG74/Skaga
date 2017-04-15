var express = require('express');
var router = express.Router();

var alcoholicController = require('../controllers/alcoholicController');
var utility = require('../utility');

app.use(alcoholicController.daily);

router.post('/:name', utility.isAuth, alcoholicController.create);
router.get('/', utility.isAuth, alcoholicController.read_all);
router.get('/aotd', utility.isAuth, alcoholicController.read_aotd);
router.get('/:id', utility.isAuth, alcoholicController.read_one);
router.get('/auth', utility.isAuth, alcoholicController.read_for_auth_user);
router.patch('/:id', utility.isAuth, alcoholicController.update_one);
router.patch('/adddrink/:id', utility.isAuth, alcoholicController.update_drinks);
router.delete('/:id', utility.isAuth, alcoholicController.delete_one);
router.delete('/auth', utility.isAuth, alcoholicController.delete_for_auth_user);

module.exports = router;