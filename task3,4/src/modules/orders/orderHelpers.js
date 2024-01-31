const fs = require('fs');
const {generateRandom} = require("../helpers")


const readOrders = () => {
    if(!fs.existsSync(__dirname + "/orders.json")){
        return [];
    }
    let orders = fs.readFileSync(__dirname + "/orders.json");
    orders = JSON.parse(orders);

    //sort by order time
    orders.sort((a,b)=>a.orderedAt-b.orderedAt);

    return orders
};


const generateUniqueId = (len=10)=>{
    let id = generateRandom();

    if(fs.existsSync(__dirname + "/orders.json")){
        const oldProd = readOrders();
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




module.exports = {readOrders, generateUniqueId}