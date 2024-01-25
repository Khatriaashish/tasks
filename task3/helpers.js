const fs = require('fs');

const readProducts = (search="", product_type="") => {
    const query = new RegExp(search, 'i');
    const filter = new RegExp(product_type, 'i');
    if(!fs.existsSync("products.json")){
        return [];
    }
    let products = fs.readFileSync("products.json");
    products = JSON.parse(products);

    //search by query
    products = products.filter((item)=>query.test(item.name)||query.test(item.description));

    //sort by price
    products.sort((a,b)=>a.price-b.price);
    

    //filter by product_type
    products = products.filter((item)=>filter.test(item.product_type));

    return products
};

const generateRandom = (len=10)=>{
    let random = "";
    const chars = "0123456789asdfghjklqwertyuiopzxcvbnm";

    for (let i=1; i<=len; i++){
        let pos = Math.ceil(Math.random()*chars.length);
        random += chars[pos-1];
    }
    return random;
}

const generateUniqueId = (len=10)=>{
    let id = generateRandom();

    if(fs.existsSync("products.json")){
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