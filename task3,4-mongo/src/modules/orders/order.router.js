const reqValidator = require('../../middlewares/request-validator');
const orderCtrl = require('./order.controller');
const OrderModel = require('./order.model');
const { addToCartSchema } = require('./order.validator');

const router = require('express').Router();

router.post('/add-to-cart/:userId', reqValidator(addToCartSchema), orderCtrl.addToCart)
router.post('/checkOut/:userId', orderCtrl.checkOut)
router.get('/listOrders', orderCtrl.listOrders)



module.exports = router;