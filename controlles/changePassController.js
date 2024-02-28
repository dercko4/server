const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/model')
const {QueryTypes} = require('sequelize')
const sequelize = require('../database')

class AuthController 
{
    async changePass(req, res, next)
    {
        const id_user = req.user.id_user
        const {nickname, email} = req.body
        try {
            if(nickname&&email)
            {
                await sequelize.query(`UPDATE "users" SET nickname='${nickname}', email='${email}' WHERE id_user=${id_user}`)
                return res.json({message: `Никнейм и email у пользователя с ID=${id_user} изменен`})
            }
            if(nickname)
            {
                await sequelize.query(`UPDATE "users" SET nickname='${nickname}' WHERE id_user=${id_user}`)
                return res.json({message: `Никнейм у пользователя с ID=${id_user} изменен`})
            }
            if(email)
            {
                await sequelize.query(`UPDATE "users" SETemail='${email}' WHERE id_user=${id_user}`)
                return res.json({message: `Email у пользователя с ID=${id_user} изменен`})
            }
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest('Не удалось изменить данные'))
        }
    }
}

module.exports = new AuthController()