const fs = require('fs');
const orderCtrl = require("./orderController");
const CheckLogin = require('../../../middlewares/auth.middleware');
const CheckPermission = require('../../../middlewares/rbac.middleware');

const router = require("express").Router();

//to list all order
router.get("/listOrders", CheckLogin, CheckPermission('admin'), orderCtrl.list)

//to add product to cart
router.post("/add-to-cart", CheckLogin, orderCtrl.addToCart)

//to checkout
router.post('/checkOut', CheckLogin, orderCtrl.checkOut)

module.exports = router;