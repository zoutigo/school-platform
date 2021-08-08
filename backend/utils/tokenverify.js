const jwt = require('jsonwebtoken')

const { Unauthorized, TokenInvalid, BadRequest } = require('./errors')
const User = require('../models/User')

module.exports.tokenVerify = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return next(new Unauthorized('Access denied'))
  }
  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
    if (!verified) return next(new BadRequest('Invalid Token'))
    const { _id } = verified

    const user = await User.findOne({ _id: _id })
    if (!user) return res.status(400).send('user does not exist')

    req.user = verified
    next()
  } catch (err) {
    return next(new TokenInvalid(err))
  }
}

module.exports.losspassTokenVerify = async (token) => {
  if (!token) return { error: 'please provide token' }

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
    console.log('verified:', verified)
    if (!verified) return { error: 'jeton invalide. il a du expirer' }
    const { _id } = verified

    return { id: _id }
  } catch (err) {
    return { error: err }
  }
}
