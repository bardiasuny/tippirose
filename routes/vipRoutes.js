const express = require('express')
const router = express.Router()

const vipController = require('../controllers/vipController')

router.post("/get-user-product", vipController.postGetUserProduct)


exports.routes = router