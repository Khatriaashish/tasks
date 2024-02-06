const router = require('express').Router();

const CheckLogin = require('../../../middlewares/auth.middleware');
const CheckPermission = require('../../../middlewares/rbac.middleware');
const uploader = require('../../../middlewares/uploader.middleware');
const productCtrl = require('./productController');

const dirSetup = (req, res, next)=>{
    req.uploadDir = "./public/uploads/products_fs"
    next()
}

router.route('/')
    .post(CheckLogin, CheckPermission('admin'), dirSetup, uploader.single('image'), productCtrl.create)
    .get(productCtrl.read);

router.get('/out-of-stock', CheckLogin, CheckPermission('admin'), productCtrl.outOfStock)

router.route('/:id')
    .delete(CheckLogin, CheckPermission('admin'), productCtrl.delete)
    .put(CheckLogin, CheckPermission('admin'), productCtrl.updateQty);

module.exports = router