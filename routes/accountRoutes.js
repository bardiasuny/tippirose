express = require('express')
const router = express.Router()

const accountContollers = require("../controllers/accountController")

router.post('/get-vip-user-products', accountContollers.postGetUserVipProducts)
router.post('/fetch-all-templates', accountContollers.fetchAllTemplates)
router.post('/assign-vip-template', accountContollers.assingVipTemplate)
router.post('/set-profile-links', accountContollers.setProfileLinks)


exports.routes = router