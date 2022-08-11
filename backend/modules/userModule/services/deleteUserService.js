const { user } = require('../../../database/models')

const deleteUserService = async (uuid) => {
  try {
    const deletedUser = await user.destroy({
      where: { uuid },
    })

    return { deletedUser, deleteUserError: false }
  } catch (error) {
    return { deletedUser: null, deleteUserError: error }
  }
}

module.exports = deleteUserService
