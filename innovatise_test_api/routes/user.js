const { Router } = require('express');
const UserController = require('../controller/user');
const auth = require('../controller/auth')

var router = Router();

router.post('/register', UserController.userRegister);
router.post('/login', UserController.userLogin);
router.get('/users', auth.checkToken, UserController.getUsers);
router.get('/users/:id', auth.checkToken, UserController.getUserById);

module.exports = router;