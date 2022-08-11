const { role } = require('../../../database/models')

const listRoleService = async () => {
  try {
    const roleList = await role.findAll({
      attributes: { exclude: ['id'] },
    })

    return { roleList, roleListError: false }
  } catch (error) {
    return {
      roleList: false,
      roleListError: error,
    }
  }
}

module.exports = listRoleService
