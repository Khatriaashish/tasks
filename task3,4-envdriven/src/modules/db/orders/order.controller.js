const productSvc = require("../products/product.service");
const userSvc = require("../users/user.service");
const orderSvc = require("./order.service");

class OrderController{
    addToCart = async (req, res, next)=>{
        try{
            const payload = req.body;
            const product = (await productSvc.listAllProduct({_id: payload.productId}))[0];
            const cartItem = {
                product: payload.productId,
                price: product.price,
                orderedQty: +payload.qty
            }

            const user = req.authUser;
    
            const response = await userSvc.updateUser(user._id, {$push: {cart: cartItem} });
    
            res.json({
                result: null,
                message: "Product added to cart",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    checkOut = async (req, res, next)=>{
        try{
            const user = req.authUser;
            const orderedItems = user.cart;
            let totalAmt = 0;
            orderedItems.forEach((item)=>{
                totalAmt += item.price*item.orderedQty;
            })
            const order = {
                orderedItems: orderedItems,
                totalAmt: totalAmt
            }
            
            if(totalAmt < 1000){
                next({code: 400, message: "Order should be of more than Rs 1000"})
            }
            else{
                const response = await orderSvc.createPayload(order);
                const updateCart = await userSvc.updateUser(req.authUser._id, {cart: []})

                res.json({
                    result: null,
                    message: "Order Placed"
                })
            }
        }
        catch(except){
            next(except);
        }
    }

    listOrders = async (req, res, next)=>{
        try{
            const response = await orderSvc.listAllOrder();
            res.json({
                result: response,
                message: "All order data fetched",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }
    

}

const orderCtrl = new OrderController();
module.exports = orderCtrl;