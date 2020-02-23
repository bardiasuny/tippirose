express = require('express')


const router = express.Router()

const adminContollers = require("../controllers/adminControllers")

router.post('/add-product', adminContollers.postAddProduct)



exports.routes = router