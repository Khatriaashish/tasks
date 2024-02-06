const bcrypt = require('bcryptjs');

class AuthRequest{
    body;


    constructor(req){
        this.body = req.body;
    }   

    transformRequestData = ()=>{
        let payload = this.body;

        payload.password = bcrypt.hashSync(payload.password, 10);
        return payload;
    }
}

module.exports = AuthRequest;