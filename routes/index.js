const Router = require('express')
const routes = new Router()
const authRoutes = require('./authRouter')
const editProfileRoutes = require('./editProfileRouter')
const changePassRouter = require('./changePassRouter')
const addfileRouter = require('./addFileRouter')

routes.use('/auth', authRoutes)
routes.use('/edit', editProfileRoutes, changePassRouter, addfileRouter)

module.exports=routes