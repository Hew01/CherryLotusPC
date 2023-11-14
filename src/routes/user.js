const userController = require('../app/controllers/userController')
const express = require('express')

const router = express.Router()

router.post('/register', userController.signUp)
router.post('/login', userController.login)
router.get('/', userController.getUsers)

module.exports = router