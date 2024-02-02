const reqValidator = require('../../../middlewares/request-validator');
const uploader = require('../../../middlewares/uploader.middleware');
const productCtrl = require('./product.controller');
const { productCreateSchema } = require('./product.validator');

const dirSetup = (req, res, next)=>{
    req.uploadDir = "./public/uploads/products"
    next()
}

const router = require('express').Router();

router.route('/')
    .post(dirSetup, uploader.single('image'), reqValidator(productCreateSchema), productCtrl.create)
    .get(productCtrl.list);

router.get('/out-of-stock', productCtrl.outOfStock)

router.route('/:id')
    .put(productCtrl.updateProduct)
    .delete(productCtrl.delete)
    .put(productCtrl.updateStockQty);

module.exports = router;