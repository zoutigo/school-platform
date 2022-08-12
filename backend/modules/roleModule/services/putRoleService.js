const { role } = require('../../../database/models')

const putRoleService = async (datas, uuid) => {
  try {
    await role.update({ ...datas }, { where: { uuid }, individualHooks: true })

    const updatedRole = await role.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { updatedRole, updateRoleError: false }
  } catch (error) {
    return { updatedRole: null, updateRoleError: error }
  }
}

module.exports = putRoleService
