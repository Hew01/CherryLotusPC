const express = require('express')
const cartController = require('../app/controllers/cartController')
const router = express.Router()

router.get('/:id', cartController.getCart)
router.post('/add-product', cartController.addToCart)

module.exports = router