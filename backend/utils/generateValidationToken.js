const jwt = require('jsonwebtoken')
require('dotenv').config()

// eslint-disable-next-line import/prefer-default-export
module.exports.generateValidationToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  )
