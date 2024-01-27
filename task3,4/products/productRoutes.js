const router = require('express').Router();

const productCtrl = require('./productController');

//to create a new product
router.post('/createProduct', productCtrl.create)

//to read product
router.get('/readProduct', productCtrl.read)

//to delete product by its id
router.delete('/deleteProduct/:id', productCtrl.delete)

// to update the product quantity
router.put('/qty/:id', productCtrl.updateQty)

//to read out of stock product
router.get('/out-of-stock', productCtrl.outOfStock)

module.exports = router