const cartModel = require('../models/cart')
const productModel = require('../models/product')
const { mongooseToObject, mongooseToObjectAll } = require('../../untils')

class CartController {
    //[GET] /cart/:id
    async getCart(req, res, next) {
        var productsResult = []
        const cart = await cartModel.findOne({userId : req.params.id})
        if(cart) {
            cart?.products.forEach(async (item) => {
                const product = await productModel.findOne({ _id : item.productId })
                if(product) {
                    productsResult.push({
                        ...product,
                        quantity : item.quantity,
                    })
                }
            })
        }
        res.render('cart', { products: mongooseToObjectAll(productsResult) })
    }

    //[POST] /cart/add-product
    async addToCart (req, res, next) {
        try {
            const { userId, productId } = req.body
            const cart = await cartModel.findOne({ userId })
            if(cart) {
                // kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
                let existProduct = null
                existProduct = cart.products.find(product => product.productId === productId)
                if(!existProduct) {
                    
                }
                else {

                }
            }
            else {
                const products = [
                    {
                        productId,
                        quantity : 1
                    }
                ]
                 await cartModel.create({ userId, products})
            }
            res.redirect('/')
        }
        catch(err) {
            res.status(500).json({"message": "add product to cart failed"})
            console.log(err)
            next(err)
        }
    }
}

module.exports = new CartController