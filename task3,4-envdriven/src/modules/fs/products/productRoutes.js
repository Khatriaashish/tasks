const router = require('express').Router();

const uploader = require('../../../middlewares/uploader.middleware');
const productCtrl = require('./productController');

const dirSetup = (req, res, next)=>{
    req.uploadDir = "./public/uploads/products_fs"
    next()
}

router.route('/')
    .post(dirSetup, uploader.single('image'), productCtrl.create)
    .get(productCtrl.read);

router.get('/out-of-stock', productCtrl.outOfStock)

router.route('/:id')
    .delete(productCtrl.delete)
    .put(productCtrl.updateQty);

module.exports = router