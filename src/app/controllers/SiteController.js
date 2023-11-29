const userModel = require('../models/user')
const productModel = require('../models/product')
const orderModel = require('../models/order')
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

    // [GET] /account/:id
    async getAccountPage (req, res, next) {
        try {
            const userId = req.params.id
            let currentUser = {}
            let userOrders = []
            const users = await userModel.find({})
            const orders = await orderModel.find({})
            users.forEach(user => {
                if(user._id.equals(userId.toString()))
                currentUser = mongooseToObject(user)
            })
            orders.forEach(order => {
                if(order.userId.equals(userId.toString())) {
                    userOrders.push(mongooseToObject(order))
                }
            })

            res.render('account', { user : currentUser, orders : userOrders })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

}

module.exports = new SiteController