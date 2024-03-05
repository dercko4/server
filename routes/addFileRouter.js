const Router = require('express')
const router = new Router()
const addfileController = require('../controlles/addFileController')
const authMiddleware = require('../authMiddleware')

router.post('/upload_avatar', authMiddleware, addfileController.upload_avatar)


module.exports = router