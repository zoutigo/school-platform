const { user } = require('../../../database/models')

const deleteRoleService = async (uuid) => {
  try {
    const deletedRole = await user.destroy({
      where: { uuid },
    })

    return { deletedRole, deletedRoleError: false }
  } catch (error) {
    return { deletedRole: null, deletedRoleError: error }
  }
}

module.exports = deleteRoleService
