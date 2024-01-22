const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_NAME,
    autoCreate: true,
    autoIndex: true
}).then((success)=>{
    console.log("Database connection successful");
}).catch((err)=>{
    console.log("Error connecting to database");
    process.exit(1);
})