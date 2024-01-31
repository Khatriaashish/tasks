const reqValidator = require('../../middlewares/request-validator');
const productCtrl = require('./product.controller');
const ProductModel = require('./product.model');
const { productCreateSchema } = require('./product.validator');

const router = require('express').Router();

router.route('/')
    .post(reqValidator(productCreateSchema), productCtrl.create)
    .get(productCtrl.list);

router.get('/out-of-stock', productCtrl.outOfStock)

router.route('/:id')
    .put(productCtrl.updateProduct)
    .delete(productCtrl.delete)
    .put(productCtrl.updateStockQty);

module.exports = router;