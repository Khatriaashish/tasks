const {generateUniqueId, readUsers} = require("./userHelpers");
const fs = require('fs');


class UserController{
    create = (req, res, next)=>{
        try{
            //getting data from req
            const data = req.body;

            //check if all required data are present or not
            if (!data.name || !data.email || !data.password) {
                return res.status(400).json({ message: 'Not sufficient data provided' });
            }

            //generate unique id for data
            data.id = generateUniqueId();
            data.cart = [];

            //fetch oldUsers from file
            const oldUsers = readUsers();

            //combine new data and all old user data
            let newUsersArr = [...oldUsers, data];

            //overwrite newUserArr data in file
            newUsersArr = JSON.stringify(newUsersArr);
            fs.writeFileSync(__dirname + "/users.json", newUsersArr);

            //response
            res.json({
                message: "User Created successfully"
            })
        }
        catch(except){
            next(except)
        }
    }

    read = (req, res, next)=>{
        try{
            res.json({
                users: readUsers()
            })
        }
        catch(except){
            next(except)
        }
    }

    readById = (req, res, next)=>{
        try{
            const users = readUsers();
        const user = users.find((user)=>user.id===req.params.id);

        res.json({
            result: user
        })
        }
        catch(except){
            next(except)
        }
        
    }

    updateUser = (req, res, next)=>{
        try{
            let oldUsers = readUsers();

            oldUsers.forEach((user)=>{
                if(user.id === req.params.id){
                    const updateData = req.body;
                    //check if all required data are present or not
                    if (!updateData.name || !updateData.email || !updateData.password) {
                        return res.status(400).json({ message: 'Not sufficient data provided' });
                    }
                    updateData.id = req.params.id;
                    updateData.cart = user.cart;

                    const remUsers = oldUsers.filter((user)=>user.id!==req.params.id);

                    const newUsersArr = [...remUsers, updateData];
                    fs.writeFileSync(__dirname+'/users.json', JSON.stringify(newUsersArr));

                    res.json({
                        message: "User updated successfully"
                    })
                }
            })
            return res.status(404).json({message: "User not found"})
        }
        catch(except){
            next(except)
        }
        

    }

    delete = (req, res, next)=>{
        try{
            let oldUsers = readUsers();

            oldUsers.forEach((user)=>{
                if(user.id === req.params.id){
                    const remUsers = oldUsers.filter((user)=>user.id!==req.params.id);

                    fs.writeFileSync(__dirname+'/users.json', JSON.stringify(remUsers));

                    return res.json({
                        message: "User deleted successfully"
                    })
                }
            })

            return res.status(404).json({message: "User not found. Maybe already deleted"})
        
        }
        catch(except){
            next(except)
        }
    }
}

const userCtrl = new UserController();
module.exports = userCtrl