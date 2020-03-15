const express = require('express')
const router = express.Router()

const vipController = require('../controllers/vipController')

router.post("/get-user-product", vipController.postGetUserProduct)

router.post("/add-links-view-count", vipController.addLinkViewCount)

exports.routes = router