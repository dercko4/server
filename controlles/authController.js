const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/model')

const generateJwt = (id_user, nickname, tag_user, email, role) => 
{
  return jwt.sign
  (
    {id_user, nickname, tag_user, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class AuthController 
{
  async registration(req, res, next)
  {
    const {nickname, tag_user, email, password} = req.body
    if (!nickname)
    {
      return next(ApiError.badRequest('Некорректный никнейм'))
    }
    if (!tag_user)
    {
      return next(ApiError.badRequest('Некорректный тэг пользователя!'))
    }
    if (!email)
    {
      return next(ApiError.badRequest('Некорректный email'))
    }
    if (!password)
    {
      return next(ApiError.badRequest('Некорректный пароль'))
    }
    let candidate = await User.findOne({where: {email}})
    if (candidate)  
    {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    candidate = await User.findOne({where: {tag_user}})
    if(candidate)
    {
        return next(ApiError.badRequest('Пользователь с таким тэгом уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({nickname, tag_user, email, password: hashPassword})
    const token = generateJwt(user.nickname, user.tag_user, user.email, user.password, user.role)
    return res.json({token})
  }

  async login(req, res, next)
  {
    const {email, password} = req.body
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
    const token = generateJwt(user.nickname, user.tag_user, user.email, user.password, user.role)
    return res.json({token})
  }
}

module.exports = new AuthController()