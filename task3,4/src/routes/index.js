const router = require('express').Router();
const productRouter = require('../modules/products/productRoutes');
const userRouter = require('../modules/users/userRoutes');
const orderRouter = require('../modules/orders/orderRoutes')

//Products
router.use(productRouter);

//Users
router.use("/user", userRouter)

//Orders
router.use("/order", orderRouter);

module.exports = router