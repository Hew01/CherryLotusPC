const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true,
    },
    password : {
        type : String,
        required : true
    },
    contact : [
        {
            phoneNumber : String,
            commune : String,
            district : String,
            province :  String
        }
    ],
    orders : [], // các đơn hàng của user
    vieweds : [], // sản phẩm đã xem gần đây
})

module.exports = mongoose.model('users', userSchema)