const { role } = require('../../../database/models')

const createRoleService = async (datas) => {
  try {
    const createdRole = await role.build(datas).save()

    return { createdRole, createdRoleError: false }
  } catch (error) {
    return {
      createdRole: false,
      createdRoleError: error,
    }
  }
}

module.exports = createRoleService
