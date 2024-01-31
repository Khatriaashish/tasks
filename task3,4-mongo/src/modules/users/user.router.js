const reqValidator = require('../../middlewares/request-validator');
const userCtrl = require('./user.controller');
const UserModel = require('./user.model');
const { userCreateSchema } = require('./user.validator');

const router = require('express').Router();

router.route('/')
    .post(reqValidator(userCreateSchema), userCtrl.create)
    .get(userCtrl.list);

router.route('/:id')
    .get(userCtrl.readOne)
    .put(userCtrl.updateUser)
    .delete(userCtrl.delete)

module.exports = router;