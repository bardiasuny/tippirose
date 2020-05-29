const express = require('express')


const router = express.Router()

const userContollers = require("../controllers/userControllers")

router.post('/order-product', userContollers.postOrderProduct)
router.post('/activate-product', userContollers.postActivateProduct)
router.post('/get-user-template', userContollers.postGetUserTemplate)

exports.routes = router