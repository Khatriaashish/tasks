const fs = require('fs');
const {generateRandom} = require("../../../config/helpers")

const readPats = () => {
    if(!fs.existsSync(__dirname + "/pats.json")){
        return [];
    }
    let pats = fs.readFileSync(__dirname + "/pats.json");
    pats = JSON.parse(pats);


    return pats
};


const generateUniqueId = (len=10)=>{
    let id = generateRandom();

    if(fs.existsSync(__dirname + "/pats.json")){
        const oldProd = readPats();
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




module.exports = {readPats, generateUniqueId}