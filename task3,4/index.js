const express = require('express');
const productRouter = require('./products/productRoutes');
const userRouter = require('./users/userRoutes');
const orderRouter = require('./orders/orderRoutes')

const app = express();

app.use(express.json());

//Products
app.use(productRouter);

//Users
app.use("/user", userRouter)

//Orders
app.use("/order", orderRouter);

//404 handle
app.use((req, res)=>{
    res.status(404).json({
        message: "Incorrect API Call"
    })
})

//exception handling
app.use((error, req, res, next)=>{
    let code = error.code??500;
    let result = error.result??null;
    let message = error.message??"Internal Server Error";

    res.status(code).json({
        result: result,
        message: message
    })
})

app.listen(3030, (err)=>{
    if(!err){
        console.log("Server is up at port 3030");
    }
})