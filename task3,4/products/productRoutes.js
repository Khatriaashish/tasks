const router = require('express').Router();
const fs = require('fs');

const { generateUniqueId, readProducts } = require('./productHelpers')

//to create a new product
router.post('/createProduct', (req, res)=>{
    //getting data from req
    const data = req.body;

    //check if all required data are present or not
    if (!data.name || !data.price || !data.description || !data.quantity || !data.product_type) {
        return res.status(400).json({ message: 'Not sufficient data provided' });
    }

    //generate unique id for data
    data.id = generateUniqueId();

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
})

//to read product
router.get('/readProduct', (req, res)=>{
    const products = readProducts(req.query['search'], req.query['product_type']);

    res.json({
        result: products
    })
})

//to delete product by its id
router.delete('/deleteProduct/:id', (req, res)=>{
    const products = readProducts();

    //gettig all products which don't have given id
    let newProductArr = products.filter((item)=>item.id!==req.params.id);

    //overwrite file with newProductArr
    newProductArr = JSON.stringify(newProductArr);
    fs.writeFileSync(__dirname + "/products.json", newProductArr);

    res.json({
        message: "Product deleted Successfully"
    })
})

// to update the product quantity
router.put('/qty/:id', (req, res)=>{
    let products = readProducts();

    //looping through every products and changing the qty in product which matches id
    products.forEach((item)=>{
        if(item.id === req.params.id){
            item.quantity = req.body.qty;
        }
    })

    products = JSON.stringify(products)
    fs.writeFileSync(__dirname + "/products.json", products);

    res.json({
        message: "Quantity updated"
    })
})

//to read out of stock product
router.get('/out-of-stock', (req, res, next)=>{
    const products = readProducts();

    //gettig all products whose qty<5
    let newProductArr = products.filter((item)=>(+item.quantity)<5);


    res.json({
        result: newProductArr,
        message: "Out of stock products fetched"
    })
})

module.exports = router