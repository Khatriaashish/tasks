const router = require('express').Router();
const userCtrl = require('./userController');

router.route('/')
//create user
    .post(userCtrl.create)

//read all users
    .get(userCtrl.read)

router.route("/:id")
//read user by id
    .get(userCtrl.readById)
//update user by id
    .put(userCtrl.updateUser)
//to delete user
    .delete(userCtrl.delete)

module.exports = router