const pagesController = require('../app/controllers/pagesController')
const express = require('express')
const router = express.Router()

router.get('/sales', pagesController.getSalesPage)
router.get('/search', pagesController.getSearchPage)
router.get('/show-room', pagesController.getShowroomPage)
router.get('/collection/:genre', pagesController.getCollection)

module.exports = router