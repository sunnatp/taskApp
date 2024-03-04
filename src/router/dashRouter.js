const express = require("express")
const router = express.Router()

const isLogin = require("../middleware/checkAuth")

const dashCtrl = require("../controller/dashCtrl")

router.get('/dashboard', isLogin, dashCtrl.dashboard)
router.get('/dashboard/add', isLogin, dashCtrl.addPage)
router.post('/dashboard/add', isLogin, dashCtrl.AddTask)
router.get('/dashboard/item/:id', isLogin, dashCtrl.viewTask)
router.post('/dashboard/update/:id', isLogin, dashCtrl.updateTask)
router.get('/dashboard/search', isLogin, dashCtrl.searchTask)
router.post('/dashboard/search', isLogin, dashCtrl.searchResult)
router.get('/dashboard/delete/:id', isLogin, dashCtrl.deleteTask)
router.post('/dashboard/message', isLogin, dashCtrl.adminMssage)
router.get('/dashboard/message', isLogin, dashCtrl.sendContact)


module.exports = router
