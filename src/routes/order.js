const express = require('express')
const orderController = require('../app/controllers/orderController')
const router = express.Router()

router.post('/place-order', orderController.placeOrder)

module.exports = router