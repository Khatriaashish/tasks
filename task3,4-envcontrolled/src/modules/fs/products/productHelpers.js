const fs = require('fs');
const {generateRandom} = require("../../../config/helpers")


const readProducts = (search="", product_type="") => {
    const query = new RegExp(search, 'i');
    const filter = new RegExp(product_type, 'i');
    if(!fs.existsSync(__dirname + "/products.json")){
        return [];
    }
    let products = fs.readFileSync(__dirname + "/products.json");
    products = JSON.parse(products);

    //search by query
    products = products.filter((item)=>query.test(item.name)||query.test(item.description));

    //sort by price
    products.sort((a,b)=>a.price-b.price);
    

    //filter by product_type
    products = products.filter((item)=>filter.test(item.product_type));

    return products
};


const generateUniqueId = (len=10)=>{
    let id = generateRandom();

    if(fs.existsSync(__dirname + "/products.json")){
        const oldProd = readProducts();
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




module.exports = {readProducts, generateUniqueId}