const productModel = require('../models/product')
const { mongooseToObjectAll, mongooseToObject } = require('../../untils')

class SiteController {
    // [GET] /
    async home (req, res, next) {
        try {
            const products = await productModel.aggregate([
                { $group : { _id : "$genre", products : { $push : "$$ROOT" } } },
                { $project : { _id : 0, title : "$_id", data : "$products" } }
            ])

            res.render('home', { products })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new SiteController