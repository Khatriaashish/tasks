const CheckLogin = require('../../../middlewares/auth.middleware')
const reqValidator = require('../../../middlewares/request-validator')
const authCtrl = require('./authController')
const { registerSchema, loginSchema } = require('./auth.validator');


const router = require('express').Router();

router.post('/register', reqValidator(registerSchema), authCtrl.register);
router.post('/login', reqValidator(loginSchema), authCtrl.login);
router.post('/logout', CheckLogin, authCtrl.logoutUser);


module.exports = router;