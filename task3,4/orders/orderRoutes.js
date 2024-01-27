const { readProducts } = require("../products/productHelpers");
const { readUsers } = require("../users/userHelpers");
const fs = require('fs');
const { generateUniqueId, readOrders } = require("./orderHelpers");

const router = require("express").Router();

//to list all order
router.get("/", (req, res, next)=>{
    try{
        const orders = readOrders();

        res.json({
            orders: orders
        })
    }
    catch(except){
        next(except)
    }
})

//to add product to cart
router.post("/add-to-cart/:userId", (req, res, next)=>{
    try{
        //took productId and qty as input
        const addedProduct = req.body;
        if(!addedProduct.productId || !addedProduct.qty){
            return res.json({
                message: "Insufficient information"
            })
        }

        //fetch user from id
        const users = readUsers();
        const user = users.find((user)=>user.id===req.params.userId);
        
        //fetch product from id
        const products = readProducts();
        const product = products.find((product)=>product.id===addedProduct.productId);

        if(!user){
            return res.status(400).json({
                message: "user not found"
            })
        }

        //populate cart
        
        //checking if given product already exists or not
        const cartProd = user.cart.find((elem)=>elem.productId===addedProduct.productId);
        if(cartProd){
            cartProd.quantity = +cartProd.quantity + +addedProduct.qty;
            const remCartProd = user.cart.filter((elem)=>elem.id!==cartProd.id);
            user.cart = [...remCartProd, cartProd];
        }
        else{
            user.cart.push({
                productId: product.id,
                product: product,
                quantity: addedProduct.qty
            })
        }

        //update users.json file
        const remUsers = users.filter((user)=>user.id!==req.params.userId);
        console.log(remUsers)
        const newUsersArr = [...remUsers, user];
        fs.writeFileSync(__dirname+"/../users/users.json", JSON.stringify(newUsersArr));

        res.json({
            message: "Product added to cart"
        })
    }
    catch(except){
        next(except);
    }
})

//to checkout
router.post('/checkout/:userId', (req, res, next)=>{
    try{
        //fetch user from id
        const users = readUsers();
        const user = users.find((user)=>user.id===req.params.userId);
        
        if(!user){
            return res.status(400).json({
                message: "user not found"
            })
        }
        
        //calculatuing total price of order
        let totalOrderPrice = 0;
        user.cart.forEach(element => {
            totalOrderPrice += element.product.price*element.quantity;
        });

        console.log(totalOrderPrice)

        //let minimum threshold price for order be 100
        if(totalOrderPrice<100){
            return res.status(400).json({
                message: "Cannot make a order of less than 100 rs"
            })
        }
        else{
            let orderDetails = []
            user.cart.forEach(elem=>{
                orderDetails.push({
                    productId: elem.id,
                    product: elem.product.name,
                    unitPrice: elem.product.price,
                    quantity: elem.quantity
                })
            })
            const order = {
                id: generateUniqueId(),
                orderBy: {
                    name: user.name,
                    email: user.email
                },
                order: orderDetails,
                totalPrice: totalOrderPrice,
                orderedAt: new Date(Date.now())
            }

            const oldOrders = readOrders();
            const newOrderArr = [...oldOrders, order]
            fs.writeFileSync(__dirname+"/orders.json", JSON.stringify(newOrderArr));

            res.json({
                message: "Order placed"
            })
        }
    }
    catch(except){
        next(except);
    }
})

module.exports = router;