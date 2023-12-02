const cartModel = require('../models/cart')
const orderModel = require('../models/order')

class OrderController {
    async placeOrder(req, res, next) {
        try {
            const { userId, address , totalPrice, phoneNumber, name} = req.body
            const cart = await cartModel.findOne({ userId })
            if(cart) {
                await orderModel.create({ userId, products : cart.products, totalPrice , shippingAddress : address, phoneNumber, name })
                cart.products = []
                await cart.save()
                return res.status(200).json('Order successfully')
            }
            else return res.status(400).json("Order failed")
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new OrderController