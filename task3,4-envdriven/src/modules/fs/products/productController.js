const { generateUniqueId, readProducts } = require('./productHelpers');
const fs = require('fs');

class ProductController{
    create = (req, res, next)=>{
        try{
            //getting data from req
            const data = req.body;
        
            //check if all required data are present or not
            if (!data.name || !data.price || !data.description || !data.stock || !data.product_type || !req.file) {
                return res.status(400).json({ message: 'Not sufficient data provided' });
            }
        
            //generate unique id for data
            data.id = generateUniqueId();

            //image
            data.image = req.file.filename;
        
            //fetch oldProducts from file
            const oldProducts = readProducts();
        
            //combine new data and all old product data
            let newProductsArr = [...oldProducts, data];
        
            //overwrite newProductArr data in file
            newProductsArr = JSON.stringify(newProductsArr);
            fs.writeFileSync(__dirname + "/products.json", newProductsArr);
        
            //response
            res.json({
                message: "Product Created successfully"
            })
        }
        catch(except){
            next(except)
        }
    }

    read = (req, res, next)=>{
        try{
            const products = readProducts(req.query['search'], req.query['product_type']);
    
            res.json({
                result: products
            })
        }
        catch(except){
            next(except)
        }
    }

    delete = (req, res, next)=>{
        try{
            const products = readProducts();
    
            //gettig all products which don't have given id
            let newProductArr = products.filter((item)=>item.id!==req.params.id);
        
            //overwrite file with newProductArr
            newProductArr = JSON.stringify(newProductArr);
            fs.writeFileSync(__dirname + "/products.json", newProductArr);
        
            res.json({
                message: "Product deleted Successfully"
            })
        }
        catch(except){
            next(except)
        }
    }

    updateQty = (req, res, next)=>{
        try{
            let products = readProducts();
    
            //looping through every products and changing the qty in product which matches id
            products.forEach((item)=>{
                if(item.id === req.params.id){
                    item.stock = req.body.stock;
                }
            })
        
            products = JSON.stringify(products)
            fs.writeFileSync(__dirname + "/products.json", products);
        
            res.json({
                message: "Quantity updated"
            })
        }
        catch(except){
            next(except)
        }
    }

    outOfStock = (req, res, next)=>{
        try{
            const products = readProducts();
    
            //gettig all products whose qty<5
            let newProductArr = products.filter((item)=>(+item.stock)<5);
        
        
            res.json({
                result: newProductArr,
                message: "Out of stock products fetched"
            })
        }
        catch(except){
            next(except)
        }
    }
}

const productCtrl = new ProductController();
module.exports = productCtrl