const fs = require('fs');
const orderCtrl = require("./orderController");

const router = require("express").Router();

//to list all order
router.get("/", orderCtrl.list)

//to add product to cart
router.post("/add-to-cart/:userId", orderCtrl.addToCart)

//to checkout
router.post('/checkout/:userId', orderCtrl.checkOut)

module.exports = router;