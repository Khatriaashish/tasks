const CheckLogin = require('../../../middlewares/authdb.middleware');
const checkPermission = require('../../../middlewares/rbac.middleware');
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
    .post(CheckLogin, checkPermission('admin'), dirSetup, uploader.single('image'), reqValidator(productCreateSchema), productCtrl.create)
    .get(CheckLogin, checkPermission('admin'), productCtrl.list);

router.get('/out-of-stock', CheckLogin, checkPermission('admin'), productCtrl.outOfStock)

router.route('/:id')
    .put(CheckLogin, checkPermission('admin'), productCtrl.updateProduct)
    .delete(CheckLogin, checkPermission('admin'), productCtrl.delete)
    .put(CheckLogin, checkPermission('admin'), productCtrl.updateStockQty);

module.exports = router;