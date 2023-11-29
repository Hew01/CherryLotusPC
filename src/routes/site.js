const express = require('express')
const siteController = require('../app/controllers/SiteController')

const router = express.Router()

router.get('/', siteController.home)
router.get('/account',siteController.getAccountPage)

module.exports = router