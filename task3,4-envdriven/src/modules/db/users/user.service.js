const UserModel = require("./user.model");

class UserService{
    createPayload = async(payload)=>{
        try{
            const user = new UserModel(payload);
            return await user.save();
        }
        catch(except){
            throw except
        }
    }

    listAllUser = async(filter={})=>{
        try{
            const response = await UserModel.find(filter)
                .sort({price: "asc"});

            return response
        }
        catch(except){
            throw except
        }
    }

    getById = async(id)=>{
        try{
            const response = await UserModel.findById(id).populate("cart", ["id", "name", "price"])

            if(!response){
                throw {code: 400, message: "User not found"}
            }

            return response
        }
        catch(except){
            throw except
        }
    }

    
    countUser = async(filter={})=>{
        try{
            const response = await UserModel.countDocuments(filter);
            return response
        }
        catch(except){
            throw except
        }
    }

    deleteUser = async(id)=>{
        try{
            const response = await UserModel.findByIdAndDelete(id);
            return response
        }
        catch(except){
            throw except
        } 
    }

    updateUser = async(id, data)=>{
        try{
            const response = await UserModel.findByIdAndUpdate(id, data);
            return response
        }
        catch(except){
            throw except
        } 
    }

}

const userSvc = new UserService();
module.exports = userSvc