const reqValidator = require('../../../middlewares/request-validator');
const userCtrl = require('./user.controller');
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