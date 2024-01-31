const express = require('express');
const app = express();
const router = require('./src/routes');
const { ZodError } = require('zod');
require('dotenv').config();

//body-parsers 
app.use(express.json());

//api
app.get("/health", (req, res, next)=>{
    res.json({
        message: "Health check OK"
    })
})

let PORT;
if(process.env.STORE_TO === 'FS'){
    PORT = 3030
}
else if(process.env.STORE_TO === 'DB'){
    PORT = 2020;
    require("./src/config/db.config");

}
else{
    console.log("Invalid storage defined at env");
    process.exit(1)
}

app.use('/api/v1', router);

//exception handling
app.use((error, req, res, next)=>{
    let code = error.code??500;
    let message = error.message??"Internal server error";
    let result = error.result??null;

    //zod exception handling
    if(error instanceof ZodError){
        let msg = {};
        error.errors.map((err)=>{
            msg[err.path[0]]= err.message;
        })
        result = msg;
        message = "Validation failure";
    }

    
    //mongodb unique error
    if(error.code === 11000){
        code = 400;
        let uniqueKeys = Object.keys(error.keyPattern)
        let msgBody = uniqueKeys.map((key)=> {
            return{
                [key]: key + ' should be unique'
            }
        })
        result = msgBody;
        message = "Validation Fail"
    }

    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})

//server listen
app.listen(PORT, (err)=>{
    if(!err){
        console.log("Server is running at port " + PORT);
    }
})