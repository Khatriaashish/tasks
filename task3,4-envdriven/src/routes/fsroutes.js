const router = require('express').Router();
const productRouter = require('../modules/fs/products/productRoutes')
const userRouter = require('../modules/fs/users/userRoutes')
const orderRouter = require('../modules/fs/orders/orderRoutes')

router.use("/product", productRouter);
router.use("/user", userRouter)
router.use("/order", orderRouter);

module.exports = router