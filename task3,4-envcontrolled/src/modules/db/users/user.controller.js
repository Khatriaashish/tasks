const userSvc = require("./user.service");

class UserController{
    create = async (req, res, next)=>{
        try{
            const payload = req.body;
    
            const response = await userSvc.createPayload(payload);
    
            res.json({
                result: response,
                message: "User created successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    list = async (req, res, next)=>{
        try{
            const response = await userSvc.listAllUser();
    
            res.json({
                result: response,
                message: "User listing successfully",
                meta: {
                    noOfUsers: await userSvc.countUser()
                }
            })
        }
        catch(except){
            next(except);
        }
    }

    readOne = async (req, res, next)=>{
        try{
            const response = await userSvc.getById(req.params.id);
    
            res.json({
                result: response,
                message: "User data fetched successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    delete = async (req, res, next)=>{
        try{
            const deleted = await userSvc.deleteUser(req.params.id);

            if(!deleted){
                throw {code: 400, message: "Already deleted or such user may never exists"};
            }
    
            res.json({
                result: deleted,
                message: "User deleted successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    updateUser = async (req, res, next)=>{
        try{
            const payload = req.body;
    
            const response = await userSvc.updateUser(req.params.id, payload);
    
            res.json({
                result: response,
                message: "User updated successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }
    

}

const userCtrl = new UserController();
module.exports = userCtrl;