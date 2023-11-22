const cartModel = require('../models/cart')
const productModel = require('../models/product')
const { mongooseToObject, mongooseToObjectAll } = require('../../untils')
const mongoose  = require('mongoose')

class CartController {
    //[GET] /cart/:id
    async getCart(req, res, next) {
        const userId = req.params.id
        const cart = await cartModel.findOne({ userId }).populate('products.productId', 'name price images')
        if(!cart) {
            return res.status(404).json({"Message": "Không tồn tại giỏ hàng"})
        }
        res.render('cart', { products: mongooseToObjectAll(cart.products) })
    }

    //[POST] /cart/add-product
    async addToCart (req, res, next) {
        try {
            const { userId, productId } = req.body
            const cart = await cartModel.findOne({ userId })
            if(cart) {
                // kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
                let existProduct = null
                existProduct = cart.products.find(product => product.productId.equals(productId.toString()))
                if(!existProduct) {
                    cart.products.push({
                        productId,
                        quantity : 1
                    })
                    await cart.save()
                    const numberOfProduct = cart?.products.length
                    return res.status(200).json({ numberOfProduct })       
                }
                else {
                    return res.status(400)     
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
                return res.status(200).json({ numberOfProduct : 1 })
            }
        }
        catch(err) {
            res.status(500).json({"message": "add product to cart failed"})
            console.log(err)
            next(err)
        }
    }

    //[GET] /cart/number-product/:id
    async getNumberOfProduct(req, res, next) {
        try {
            const userId = req.params.id
            const cart = await cartModel.findOne({ userId })
            const numberOfProduct = cart?.products.length ?? 0
            res.status(200).json({ numberOfProduct })
        }
        catch(err)
        {
            console.log(err)
            next(err)
        }
    }

    //[POST] /cart/increase-quantity 
    async increaseQuantity(req, res, next) {
       try {
            const { userId, productId } = req.body
            const cart = await cartModel.findOne({ userId })
            if(cart) {
                cart.products.forEach(product => {
                    if(product.productId.equals(productId.toString()))
                        product.quantity+=1
                })
                await cart.save()
            }
            res.redirect(`/cart/${userId}`)
       }
       catch(err) {
            console.log(err)
            next(err)
       }
    }

    //[POST] /cart/decrease-quantity 
    async decreaseQuantity(req, res, next) {

    }
}

module.exports = new CartController