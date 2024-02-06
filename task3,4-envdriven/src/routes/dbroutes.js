const router = require('express').Router();
const productRouter = require('../modules/db/products/product.router')
const userRouter = require('../modules/db/users/user.router')
const orderRouter = require('../modules/db/orders/order.router')
const authRouter = require('../modules/db/auth/auth.router')

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);

module.exports = router