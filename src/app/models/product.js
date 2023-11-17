const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    des : {
        type : String,
        required : true
    },
    genre : {
        type: String,
        required : true
    },
    price : {
        type: Number,
        required : true,
    },
    promotions: [],
    branch: {
        type : String,
        required: true,
    },
    images : {
        type : Array,
        required: true,
    }
}, {
    timestamps : true
})


module.exports = mongoose.model('products', productSchema)