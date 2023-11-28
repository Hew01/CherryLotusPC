const productModel = require('../models/product')
const { mongooseToObjectAll, mongooseToObject } = require('../../untils')

class PagesController {
    //[GET] /pages/sales
    getSalesPage(req, res, next) {
        res.render('sales')
    }

    //[GET] /pages/shoow-room
    getShowroomPage(req, res, next) {
        res.render('showroom')
    }

    //[GET] /pages/collection/:genre
    async getCollection(req, res, next) {
        try {
            const genre = req.params.genre
            const products = await productModel.find({ genre })
            res.render('collection', { products : mongooseToObjectAll(products) })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new PagesController