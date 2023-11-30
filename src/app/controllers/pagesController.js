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
            var type = 'asc'
            if(req.query._sort) {
                type = req.query.type || 'asc'
            }
            const products = await productModel.find({ genre }).sort({ price : type })
            res.render('collection', { products : mongooseToObjectAll(products), type : type })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    //[GET] /pages/search
    async getSearchPage(req, res, next) {
        try {
            const text = req.query.text.trim()
            var productResults = []
            const products = await productModel.find({})
            products.forEach(product => {
                if(product.name.toLowerCase().includes(text.toLowerCase()))
                    productResults.push(mongooseToObject(product))
            })     
            res.render('search', { searchInput : text, products : productResults })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new PagesController