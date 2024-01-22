const express = require('express');
const cors = require('cors');
const appRouter= require('../app/app.router');
const app = express();
require("./db.config")

//cross-origin
app.use(cors());

//body-parser
app.use(express.json())

//test
app.use('/health', (req, res, next)=>{
    res.send("Health Check Ok");
})

//api 
app.use(appRouter)

//404 handling
app.use((req, res, next)=>{
    res.status(404).json({
        result: null,
        message: "404 not found",
        meta: nul
    })
})

//exception handling
app.use((error, req, res, next)=>{
    let code = error.code??500;
    let message = error.message??"Internal server error";
    let result = error.result??null;

    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})

module.exports = app