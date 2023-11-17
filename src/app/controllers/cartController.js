const cartModel = require('../models/cart')
const productModel = require('../models/product')

class CartController {
    //[GET] /cart/:id
    async getCart(req, res, next) {
        const cart = await cartModel.findOne({userId : req.params.id})
        var productsResult = []
        cart.products.forEach(async (item) => {
            const product = await productModel.findOne({ _id : item.productId })
            productsResult.push({
                ...product,
                quantity : item.quantity,
            })
        })
        res.render('cart', { products: productsResult })
    }
}

module.exports = new CartController