const OrderModel = require("./order.model");

class OrderService{
    createPayload = async(payload)=>{
        try{
            const order = new OrderModel(payload);
            return await order.save();
        }
        catch(except){
            throw except
        }
    }

    listAllOrder = async(filter={})=>{
        try{
            const response = await OrderModel.find(filter)
                .populate("orderedItems.product", ["_id", "name", "price"]);

            return response
        }
        catch(except){
            throw except
        }
    }
}

const orderSvc = new OrderService();
module.exports = orderSvc