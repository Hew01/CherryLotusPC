const express = require('express')
const cartController = require('../app/controllers/cartController')
const router = express.Router()

router.get('/:id', cartController.getCart)
router.get('/number-product/:id', cartController.getNumberOfProduct)
router.post('/increase-quantity', cartController.increaseQuantity)
router.post('/decrease-quantity', cartController.decreaseQuantity)
router.post('/add-product', cartController.addToCart)

module.exports = router