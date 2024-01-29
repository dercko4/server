const Router = require('express')
const routes = new Router()
const authRoutes = require('./authRouter')

routes.use('/auth', authRoutes)

module.exports=routes