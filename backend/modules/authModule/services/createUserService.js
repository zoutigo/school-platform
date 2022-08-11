const { user } = require('../../../database/models')

const createUserService = async (usr) => {
  try {
    const { dataValues: createdUser } = await user.build(usr).save()

    return { createdUser, userCreationError: null }
  } catch (error) {
    return { createdUser: null, userCreationError: error }
  }
}

module.exports = createUserService
