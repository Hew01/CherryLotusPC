const express = require('express')
const cartController = require('../app/controllers/cartController')
const router = express.Router()

router.get('/number-product/:id', cartController.getNumberOfProduct)
router.get('/:id', cartController.getCart)
router.post('/increase-quantity', cartController.increaseQuantity)
router.post('/decrease-quantity', cartController.decreaseQuantity)
router.post('/delete-product', cartController.destroy)
router.post('/add-product', cartController.addToCart)

module.exports = router