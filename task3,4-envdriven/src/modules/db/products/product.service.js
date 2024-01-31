const ProductModel = require("./product.model");

class ProductService{
    createPayload = async(payload)=>{
        try{
            const product = new ProductModel(payload);
            return await product.save();
        }
        catch(except){
            throw except
        }
    }

    listAllProduct = async(filter={})=>{
        try{
            const response = await ProductModel.find(filter)
                .sort({price: "asc"});
                console.log(response)

            return response
        }
        catch(except){
            throw except
        }
    }

    listOutOfStock = async(filter={})=>{
        try{
            const response = await ProductModel.find(filter);
                console.log(response)

            return response
        }
        catch(except){
            throw except
        }
    }
    
    countProduct = async(filter={})=>{
        try{
            const response = await ProductModel.countDocuments(filter);
            return response
        }
        catch(except){
            throw except
        }
    }

    deleteProduct = async(id)=>{
        try{
            const response = await ProductModel.findByIdAndDelete(id);
            return response
        }
        catch(except){
            throw except
        } 
    }

    updateProduct = async(id, data)=>{
        try{
            const response = await ProductModel.findByIdAndUpdate(id, data);
            return response
        }
        catch(except){
            throw except
        } 
    }

    updateStock = async(id, qty)=>{
        try{
            const response = await ProductModel.findByIdAndUpdate(id, {stock: qty});
            return response
        }
        catch(except){
            throw except
        }
    }
}

const productSvc = new ProductService();
module.exports = productSvc