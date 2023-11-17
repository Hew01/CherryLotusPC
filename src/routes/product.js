const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/productController')

router.get('/details/:id', productController.getProductDetail)
router.get('/', productController.getAllProducts)
router.post('/', productController.addNewProduct)

module.exports = router