const express = require('express');
const fs = require('fs');
const { generateUniqueId, readProducts } = require('./helpers');

const app = express();

app.use(express.json());

//to create a new product
app.post('/create', (req, res)=>{
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
    fs.writeFileSync("products.json", newProductsArr);

    //response
    res.json({
        message: "Product Created successfully"
    })
})

//to read product
app.get('/read', (req, res)=>{
    const products = readProducts(req.query['search'], req.query['product_type']);

    res.json({
        result: products
    })
})

//to delete product by its id
app.delete('/delete/:id', (req, res)=>{
    const products = readProducts();

    //gettig all products which don't have given id
    let newProductArr = products.filter((item)=>item.id!==req.params.id);

    //overwrite file with newProductArr
    newProductArr = JSON.stringify(newProductArr);
    fs.writeFileSync("products.json", newProductArr);

    res.json({
        message: "Product deleted Successfully"
    })
})

// to update the product quantity
app.put('/qty/:id', (req, res)=>{
    let products = readProducts();

    //looping through every products and changing the qty in product which matches id
    products.forEach((item)=>{
        if(item.id === req.params.id){
            item.quantity = req.body.qty;
        }
    })

    products = JSON.stringify(products)
    fs.writeFileSync('products.json', products);

    res.json({
        message: "Quantity updated"
    })
})

//to read out of stock product
app.get('/out-of-stock', (req, res, next)=>{
    const products = readProducts();

    //gettig all products whose qty<5
    let newProductArr = products.filter((item)=>(+item.quantity)<5);


    res.json({
        result: newProductArr,
        message: "Out of stock products fetched"
    })
})

//404 handle
app.use((req, res)=>{
    res.status(404).json({
        message: "Incorrect API Call"
    })
})

app.listen(3030, (err)=>{
    if(!err){
        console.log("Server is up at port 3030");
    }
})