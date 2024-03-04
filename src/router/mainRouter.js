const express = require("express")
const router = express.Router()

const mainCtrl = require("../controller/mainCtrl")

router.get('/', mainCtrl.home)
router.get('/about', mainCtrl.about)


module.exports = router