const fs = require('fs');
const {generateRandom} = require("../../../config/helpers")

const readUsers = () => {
    if(!fs.existsSync(__dirname + "/users.json")){
        return [];
    }
    let users = fs.readFileSync(__dirname + "/users.json");
    users = JSON.parse(users);


    return users
};


const generateUniqueId = (len=10)=>{
    let id = generateRandom();

    if(fs.existsSync(__dirname + "/users.json")){
        const oldProd = readUsers();
        if(oldProd !== '[]'){
            oldProd.forEach(element => {
                while(element.id === id){
                    id = generateRandom()
                }
            });
        }
    }

    return id;
}




module.exports = {readUsers, generateUniqueId}