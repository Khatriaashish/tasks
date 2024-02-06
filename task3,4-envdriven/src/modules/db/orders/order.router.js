const CheckLogin = require('../../../middlewares/authdb.middleware');
const reqValidator = require('../../../middlewares/request-validator');
const orderCtrl = require('./order.controller');
const { addToCartSchema } = require('./order.validator');

const router = require('express').Router();

router.post('/add-to-cart', CheckLogin, reqValidator(addToCartSchema), orderCtrl.addToCart)
router.post('/checkOut', CheckLogin, orderCtrl.checkOut)
router.get('/listOrders', orderCtrl.listOrders)



module.exports = router;