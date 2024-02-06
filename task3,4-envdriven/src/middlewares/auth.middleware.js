const jwt = require('jsonwebtoken');

require('dotenv').config()
const {getTokenFromHeaders} = require('../config/helpers');
const authSvc = require('../modules/db/auth/auth.service');
const {readPats} = require("../modules/fs/auth/authHelpers");
const { readUsers } = require('../modules/fs/users/userHelpers');

const CheckLogin = async (req, res, next)=>{
    try{
        let token = getTokenFromHeaders(req);
        if(token===null){
            next({
                code: 401, message: "Login Required"
            })
        }
        else{
            token = (token.split(" ")).pop();
            if(!token){
                next({
                    code: 401, message: "Token Required"
                })
            }
            else{
                const pats = readPats();
                console.log(pats)
                const patData = pats.filter((pat) => pat.token === token);
                console.log(patData)
                if(patData[0]){
                    let data = jwt.verify(token, process.env.JWT_SECRET);
                    let users = readUsers();
                    const userDetail = users.filter((user) => user.id === data.userId);
                    if(userDetail){
                        req.authUser = userDetail[0];
                        next();
                    }
                    else{
                        next({code: 401, message: "User doesn't exists anymore"});
                    }
                }
                else{
                    next({code:401, message: "Token already expired or invalid"});
                }
            }
        }
    }
    catch(excpt){
        next({code: 401, message: excpt.message})
    }
}

module.exports = CheckLogin