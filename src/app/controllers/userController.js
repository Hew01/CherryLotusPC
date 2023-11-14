const userModel = require('../models/user')

class UserController {
    //[GET] /users
    async getUsers(req, res, next) {
        try {
           const users = await userModel.find({})
            res.status(200).json({ "Message": "Get users successfully", "Users": users })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    //[POST] /users/register
    async signUp (req, res, next) {
        try {
            const { username, email , password } = req.body
            // check if email is exist
            const users = await userModel.find({ email })
            if(users.length) {
               return res.status(400).json({'message' : 'your email is exist'})
            }     
            else {
                const newUser = new userModel({username, email, password})
                await newUser.save()   
    
                return res.status(200).json({ "message" : "Sign up successfully", currentUser : newUser })
            }
           
        }   
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    //[POST] /users/login
    async login(req, res, next) {
        try {
            const { email, password } = req.body 
            const user = await userModel.findOne({ email })
            if(!user) {
                return res.status(400).json({ "message" : "email is not exists" })
            }

            if(user.password !== password) {
                return res.status(404).json({ "message": "passwors is incorrect" })
            }

            res.status(200).json({ "message" : "Login successfully", currentUser : user })
        }
        catch(err)
        {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new UserController

