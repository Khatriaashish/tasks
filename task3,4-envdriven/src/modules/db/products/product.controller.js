const productSvc = require("./product.service");

class ProductController{
    create = async (req, res, next)=>{
        try{
            const payload = req.body;
            payload.image = req.file.filename;
    
            const response = await productSvc.createPayload(payload);
    
            res.json({
                result: response,
                message: "Product created successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    list = async (req, res, next)=>{
        try{
            let filter = {};

            filter = {
                ...filter,
                $or: [
                    {
                        name: new RegExp(req.query['search'], "i")
                    },
                    {
                        description: new RegExp(req.query['search'], "i")
                    },
                ]
            }

            filter = {
                ...filter,
                $and: [
                    {
                        product_type: new RegExp(req.query['filter'], "i")
                    }
                ]
            }
            const response = await productSvc.listAllProduct(filter);
    
            res.json({
                result: response,
                message: "Product listing successfully",
                meta: {
                    noOfProducts: await productSvc.countProduct()
                }
            })
        }
        catch(except){
            next(except);
        }
    }

    delete = async (req, res, next)=>{
        try{
            const deleted = await productSvc.deleteProduct(req.params.id);

            if(!deleted){
                throw {code: 400, message: "Already deleted or such product may never exists"};
            }
    
            res.json({
                result: deleted,
                message: "Product deleted successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    updateProduct = async (req, res, next)=>{
        try{
            const payload = req.body;
    
            const response = await productSvc.updateProduct(req.params.id, payload);
    
            res.json({
                result: response,
                message: "Product created successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }
    
    updateStockQty = async (req, res, next)=>{
        try{
            const response = await productSvc.updateStock(req.params.id, req.body.stock);
            if(!response){
                throw {code: 400, message: "Product not found"};
            }
    
            res.json({
                result: response,
                message: "Product stock quantity updated successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    outOfStock = async (req, res, next)=>{
        try{
            const filter = {
                stock: {$lt: 5}
            }
            const response = await productSvc.listOutOfStock(filter);
    
            res.json({
                result: response,
                message: "Out of stock product retrieved successfully",
                meta: {
                    totalOutofStock: await productSvc.countProduct(filter),
                    totalProduct: await productSvc.countProduct(),
                }
            })
        }
        catch(except){
            next(except);
        }
    }

}

const productCtrl = new ProductController();
module.exports = productCtrl;