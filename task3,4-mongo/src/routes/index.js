const router = require('express').Router();
const productRouter = require('../modules/products/product.router');
const userRouter = require('../modules/users/user.router');
const orderRouter = require('../modules/orders/order.router');

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);



module.exports = router