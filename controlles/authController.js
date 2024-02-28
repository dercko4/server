const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/model')

const generateJwt = (id_user, nickname, email, role) => 
{
  return jwt.sign
  (
    {id_user, nickname, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class AuthController 
{
  async registration(req, res, next)
  {
    const {email, password, password_check} = req.body
    if (!email)
    {
      return next(ApiError.badRequest('Некорректный email'))
    }
    if (!password)
    {
      return next(ApiError.badRequest('Некорректный пароль'))
    }
    if(password!==password_check) return next(ApiError.badRequest('Пароли не совпадают!'))
    let candidate = await User.findOne({where: {email}})
    if (candidate)  
    {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, password: hashPassword})
    const token = generateJwt(user.id_user, user.email, user.password, user.role)
    return res.json({token})
  }

  async login(req, res, next)
  {
    const {email, password} = req.body
    if (!email)
    {
      return next(ApiError.badRequest('Некорректный email'))
    }
    if (!password)
    {
      return next(ApiError.badRequest('Некорректный пароль'))
    }
    const user = await User.findOne({where: {email}})
    if (!user)
    {
      return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword)
    {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id_user, user.nickname, user.email, user.password, user.role)
    return res.json({token})
  }
}

module.exports = new AuthController()