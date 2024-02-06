const { getTokenFromHeaders } = require("../../../config/helpers");
const userSvc = require("../users/user.service");
const AuthRequest = require("./auth.request");
const authSvc = require("./auth.service");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

class AuthController{
    register = async (req, res, next)=>{
        try{
            const payload = (new AuthRequest(req)).transformRequestData();
            
            let response = await authSvc.registerUser(payload);

            res.json({
                result: response,
                message: "User Registered",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    login = async(req, res, next)=>{
        try{
            const credentials = req.body;
            const user = await authSvc.getUserByFilter({email: credentials.email});

            if(user){
                if(bcrypt.compareSync(credentials.password, user.password)){
                    let token = jwt.sign({
                        userId: user._id
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1d'
                    })

                    let patData = {
                        userId: user._id,
                        token: token
                    }

                    await authSvc.storePAT(patData);

                    res.json({
                        token: token,
                        message: "Logged in"
                    })
                    
                }
                else{
                    throw {code: 401, message: "Credentials doesn't match"};
                }
            }
            else{
                throw {code: 400, message: "User Not found"};
            }
        }
        catch(except){
            next(except);
        }
    }

    logoutUser = async(req, res, next)=>{
        try{
            let token = getTokenFromHeaders(req);
            token = token.split(" ").pop();
            if(!token){
                next({ code: 401, message: "Token Required"})
            }
            else{
                let loggedout = await authSvc.deletePAT(token);
                res.json({
                    result: null,
                    message: "Logged Out Success",
                    meta: null
                })
            }
        }
        catch(except){
            next(except);
        }
    }
}

const authCtrl = new AuthController();

module.exports = authCtrl;