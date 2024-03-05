const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {UserFiles} = require('../models/model')

class addFileController
{
    async upload_avatar(req, res, next)
    {
        const userIdUser = req.user.id_user 
        if(!req.files.file_avatar) return next(ApiError.badRequest(`Не удалось взять файл!`))
        const file = req.files.file_avatar
        if(!file)
        {
            console.log()
            return next(ApiError.badRequest(`Не удалось взять файл!`))
        }
        file.mv('D:/Мухторов 11 ИС 222/Server/Files/' + file.name)
        const filesize = file.size
        const filetype = file.mimetype
        const filename = file.name
        const file_db = await UserFiles.create({filename, filetype, filesize, userIdUser: userIdUser})
        res.send(`Норм`)
    }
}

module.exports = new addFileController()