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
    addresses : [
        {    
            phoneNumber : String,
            ward : String,
            district : String,
            province :  String        
        },       
    ],
})

module.exports = mongoose.model('users', userSchema)