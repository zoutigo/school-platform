const { user } = require('../../../database/models')
const { userInclude } = require('../authIncludes')

const verifyUserService = async (email) => {
  try {
    const userVerified = await user.findOne({
      where: { email },
      include: userInclude,
    })
    return { userVerified, error: false }
  } catch (error) {
    return { userVerified: null, error }
  }
}

module.exports = verifyUserService
