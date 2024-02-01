const fs = require('fs');
const orderCtrl = require("./orderController");

const router = require("express").Router();

//to list all order
router.get("/listOrders", orderCtrl.list)

//to add product to cart
router.post("/add-to-cart/:userId", orderCtrl.addToCart)

//to checkout
router.post('/checkOut/:userId', orderCtrl.checkOut)

module.exports = router;