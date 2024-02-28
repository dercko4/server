const Router = require('express')
const routes = new Router()
const authRoutes = require('./authRouter')
const editProfileRoutes = require('./editProfileRouter')

routes.use('/auth', authRoutes)
routes.use('/edit', editProfileRoutes)

module.exports=routes