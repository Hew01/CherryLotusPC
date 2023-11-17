const productModel = require('../models/product')

class ProductController {
    // [GET] /products
    async getAllProducts(req, res, next) {
        try {
            const products = await productModel.aggregate([
                { $group : { _id : "$genre", products : { $push : "$$ROOT" } } },
                { $project : { _id : 0, title : "$_id", data : "$products" } }
            ]) 

            res.status(200).json({ "message" : "fetch products successfully", products})
        }
        catch(err) {
            res.status(500).json({"message": "fetch products failed"})
            console.log(err)
            next(err)
        }
    }

    // [GET] /products/details/:id 
    async getProductDetail (req, res, next) {
        try {
            const product = await productModel.findOne({ _id : req.params.id })  
            const resultProduct = product.toObject()
            res.render('product_detail', { product : resultProduct } )     
        }   
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    // [POST] /products
    async addNewProduct (req, res, next) {
        try {
            const { product } = req.body
            await productModel.create(product)
            res.status(200).json({ "message" : "Add new product successfully" })
        }
        catch(err) {
            res.status(500).json({ "message" : "Add new product failed" })
            console.log(err)
            next(err)
        }
    }

}

module.exports = new ProductController