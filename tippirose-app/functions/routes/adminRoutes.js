express = require('express')
const router = express.Router()

const adminContollers = require("../controllers/adminControllers")

router.post('/add-product', adminContollers.postAddProduct)

router.post('/get-product', adminContollers.postGetProduct)

router.post('/get-product-images', adminContollers.postGetProductImages)


exports.routes = router