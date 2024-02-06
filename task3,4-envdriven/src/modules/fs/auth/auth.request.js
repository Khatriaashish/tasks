const bcrypt = require('bcryptjs');
const {generateUniqueId} = require("../users/userHelpers")


class AuthRequest{
    body;


    constructor(req){
        this.body = req.body;
    }   

    transformRequestData = ()=>{
        let payload = this.body;
        payload.id = generateUniqueId();
        payload.password = bcrypt.hashSync(payload.password, 10);
        payload.role = "customer"
        payload.cart = [];
        return payload;
    }
}

module.exports = AuthRequest;