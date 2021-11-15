const jwt = require('jsonwebtoken')

const { Unauthorized, TokenInvalid, BadRequest } = require('./errors')
const User = require('../models/User')
const UserP = require('../models/UserP')
const { userInclude } = require('../constants/includes')

module.exports.tokenVerify = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return next(new Unauthorized('veillez vous connecter au site'))
  }
  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
    if (!verified) return next(new BadRequest('Invalid Token'))
    const { id } = verified

    const user = await UserP.findOne({ where: { id }, include: userInclude })
    if (!user) return next(new BadRequest("Cet utilisateur n'existe plus"))

    req.user = user
    next()
  } catch (err) {
    return next(new TokenInvalid(err))
  }
}

module.exports.losspassTokenVerify = async (token) => {
  if (!token) return { error: 'please provide token' }

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
    if (!verified)
      return { error: 'Le jeton est jeton invalide. il a du expirer' }

    const { id } = verified

    return { id: id }
  } catch (err) {
    return { error: err }
  }
}
