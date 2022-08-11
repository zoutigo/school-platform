const { role } = require('../../../database/models')

const getRoleService = async (uuid) => {
  try {
    const requestedRole = await role.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { requestedRole, requetedRoleError: false }
  } catch (error) {
    return {
      requestedRole: false,
      requetedRoleError: error,
    }
  }
}

module.exports = getRoleService
