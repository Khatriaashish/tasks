const router = require('express').Router();
const CheckLogin = require('../../../middlewares/auth.middleware');
const CheckPermission = require('../../../middlewares/rbac.middleware');
const userCtrl = require('./userController');

router.route('/')
//create user
    .post(CheckLogin, CheckPermission('admin'), userCtrl.create)

//read all users
    .get(CheckLogin, CheckPermission('admin'), userCtrl.read)

router.route("/:id")
//read user by id
    .get(CheckLogin, CheckPermission('admin'), userCtrl.readById)
//update user by id
    .put(CheckLogin, CheckPermission('admin'), userCtrl.updateUser)
//to delete user
    .delete(CheckLogin, CheckPermission('admin'), userCtrl.delete)

module.exports = router