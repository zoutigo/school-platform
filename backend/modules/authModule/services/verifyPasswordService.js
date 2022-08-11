const bcrypt = require('bcrypt')

const verifyPasswordService = async (password, user) => {
  const passwordVerified = await bcrypt.compare(password, user.password)
  return passwordVerified
}

module.exports = verifyPasswordService
