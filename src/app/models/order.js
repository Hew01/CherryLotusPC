const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true
    },
    name : {
        type : String
    },
    products : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'products'
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],
    totalPrice : {
        type : Number,
        required : true,
    },
    phoneNumber : {
        type : String,
        required : true
    },
    shippingAddress : {
        type : String,
        required : true
    }
},{
    timestamps : true,
})

module.exports = mongoose.model('orders', orderSchema)
