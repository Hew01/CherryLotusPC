const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        required : true,
        ref: 'users'
    },
    status : {
        type: String,
        default : 'Active'
    },
    products : [
        {
            productId : {
                type: Schema.Types.ObjectId,
                required : true,
                ref: 'products'
            },
            quantity : {
                type : Number,
                required : true,
                default : 1,
            }
        }
    ]
}, {
    timestamps : true
})

module.exports = mongoose.model('carts', cartSchema)