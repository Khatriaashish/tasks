const { getTokenFromHeaders } = require("../../../config/helpers");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const AuthRequest = require("./auth.request")
const fs = require('fs')
const {readUsers} = require("../users/userHelpers")
const {readPats} = require("./authHelpers")


class AuthController{
    register = async (req, res, next)=>{
        try{
            const payload = (new AuthRequest(req)).transformRequestData();
            const users = readUsers();
            const user = users.filter((user) => user.email === payload.email);
            if(!user[0]){
                users.push(payload);
                fs.writeFileSync(__dirname + "/../users/users.json", JSON.stringify(users));

                res.json({
                    message: "User Registered",
                    meta: null
                })
            }
            else{
                res.json({
                    message: "User with same email already registered"
                })
            }
        }
        catch(except){
            next(except);
        }
    }

    login = async(req, res, next)=>{
        try{
            const credentials = req.body;
            const users = readUsers();
            const user = users.filter((user) => user.email === credentials.email);
            if(user){
                if(bcrypt.compareSync(credentials.password, user[0].password)){
                    let token = jwt.sign({
                        userId: user[0].id
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1d'
                    })

                    let patData = {
                        userId: user[0].id,
                        token: token
                    }

                    console.log(patData)

                    let pats = readPats();
                    pats.push(patData);

                    fs.writeFileSync(__dirname+"/pats.json", JSON.stringify(pats));

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
            console.log("check")
            let token = getTokenFromHeaders(req);
            token = token.split(" ").pop();
            if(!token){
                next({ code: 401, message: "Token Required"})
            }
            else{
                console.log("here")
                const pats = readPats();
                const newpats = pats.filter((pat) => pat.token !== token);
                
                fs.writeFileSync(__dirname +'/pats.json', JSON.stringify(newpats));

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