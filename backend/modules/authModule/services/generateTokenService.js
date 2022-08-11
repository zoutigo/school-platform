const jwt = require('jsonwebtoken')
require('dotenv').config()

// eslint-disable-next-line import/prefer-default-export
const generateTokenService = (user) =>
  jwt.sign(
    {
      uuid: user.uuid,
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      roles: user.roles,
      isVerified: user.isVerified,
      classrooms: user.entities,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_LOGIN_DURATION }
  )

module.exports = generateTokenService
