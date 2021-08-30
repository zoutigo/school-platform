const jwt = require('jsonwebtoken')
require('dotenv').config()

// eslint-disable-next-line import/prefer-default-export
module.exports.generateValidationToken = (user) =>
  jwt.sign(
    {
      id: user.id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  )
