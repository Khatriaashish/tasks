const router = require('express').Router();
const fs = require('fs');
const {generateUniqueId, readUsers} = require("./userHelpers")

router.route('/')
//create user
    .post((req, res)=>{
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
    })

//read all users
    .get((req, res)=>{
        res.json({
            users: readUsers()
        })
    })

router.route("/:id")
//read user by id
    .get((req, res)=>{
        const users = readUsers();
        const user = users.find((user)=>user.id===req.params.id);

        res.json({
            result: user
        })
    })
//update user by id
    .put((req, res)=>{
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

    })
//to delete user
    .delete((req, res)=>{
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
    })

module.exports = router