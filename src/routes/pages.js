const pagesController = require('../app/controllers/pagesController')
const express = require('express')
const router = express.Router()

router.get('/sales', pagesController.getSalesPage)
router.get('/show-room', pagesController.getShowroomPage)

module.exports = router