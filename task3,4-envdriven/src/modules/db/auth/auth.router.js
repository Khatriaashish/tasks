const reqValidator = require('../../../middlewares/request-validator');
const { registerSchema, loginSchema } = require('./auth.validator');
const CheckLogin = require('../../../middlewares/authdb.middleware')
const authCtrl = require('./auth.controller')

const router = require('express').Router();

router.post('/register', reqValidator(registerSchema), authCtrl.register);
router.post('/login', reqValidator(loginSchema), authCtrl.login);
router.post('/logout', CheckLogin, authCtrl.logoutUser);


module.exports = router;