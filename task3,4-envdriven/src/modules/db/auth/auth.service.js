const UserModel = require("../users/user.model");
const PATModel = require("./personal-access-token.model");

class AuthService{
    registerUser = async (payload)=>{
        try{
            let user = new UserModel(payload)
            let response = await user.save();
            return response;
        }
        catch(except){
            throw except;
        }
    }

    getUserByFilter = async (filter)=>{
        try{
            let response = await UserModel.findOne(filter)
            return response;
        }
        catch(except){
            throw except;
        }
    } 

    storePAT = async(data)=>{
        try{
            let patObj = new PATModel(data);
            return await patObj.save();
        }
        catch(except){
            throw except;
        }
    }

    getPATByToken = async(token)=>{
        try{
            let PATData = await PATModel.findOne({token: token});
            return PATData;
        }
        catch(excpt){
            throw excpt;
        }
    }

    getuserByFilter = async(filter) => {
        try {
            let userDetail = await UserModel.findOne(filter) 
            return userDetail;
        } catch(exception) {
            throw exception;
        }
    }

    deletePAT = async (token)=>{
        try{
            let deleted = await PATModel.findOneAndDelete({
                token: token
            })
            if(deleted){
                return deleted;
            }
            else{
                throw {code: 404, message: "Token does not exists"}
            }
        }
        catch(excpt){
            throw excpt;
        }
    }
}

const authSvc = new AuthService();

module.exports = authSvc;