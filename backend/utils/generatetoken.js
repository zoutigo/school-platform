const jwt = require('jsonwebtoken')
require('dotenv').config()

// eslint-disable-next-line import/prefer-default-export
module.exports.generateToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      roles: user.roles,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isModerator: user.isModerator,
      isTeacher: user.isTeacher,
      isVerified: user.isVerified,
      childrenClasses: user.childrenClasses,
      firstname: user.firstname,
      gender: user.gender,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_LOGIN_DURATION }
  )
