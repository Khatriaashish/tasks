const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DBNAME,
    autoCreate: true,
    autoIndex: true
}).then((success)=>{
    console.log("Database connection successful");
}).catch((err)=>{
    console.log("Database connection failed");
    process.exit(1);
})