const router = require('express').Router();

const productCtrl = require('./productController');

router.route('/')
    .post(productCtrl.create)
    .get(productCtrl.read);

router.get('/out-of-stock', productCtrl.outOfStock)

router.route('/:id')
    .delete(productCtrl.delete)
    .put(productCtrl.updateQty);

module.exports = router