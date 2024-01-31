const router = require('express').Router();
const fsroutes = require('./fsroutes');
const dbroutes = require('./dbroutes');
require('dotenv').config()

if(process.env.STORE_TO === 'FS'){
    router.use(fsroutes);
}
else if(process.env.STORE_TO === 'DB'){
    router.use(dbroutes);
}
else{
    console.log("Invalid storage mode");
    process.exit(1);
}

module.exports = router;