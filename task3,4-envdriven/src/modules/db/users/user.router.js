const reqValidator = require('../../../middlewares/request-validator');
const userCtrl = require('./user.controller');
const CheckLogin = require('../../../middlewares/authdb.middleware');
const checkPermission = require('../../../middlewares/rbac.middleware');
const { userCreateSchema } = require('./user.validator');

const router = require('express').Router();

router.route('/')
    .post(CheckLogin, checkPermission('admin'), reqValidator(userCreateSchema), userCtrl.create)
    .get(CheckLogin, checkPermission('admin'), userCtrl.list);

router.route('/:id')
    .get(CheckLogin, checkPermission('admin'), userCtrl.readOne)
    .put(CheckLogin, checkPermission('admin'), userCtrl.updateUser)
    .delete(CheckLogin, checkPermission('admin'), userCtrl.delete)

module.exports = router;