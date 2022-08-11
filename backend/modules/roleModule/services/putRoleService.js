const { role } = require('../../../database/models')

const putRoleService = async (datas, uuid) => {
  try {
    console.log('---------------datas', datas)
    await role.update({ ...datas }, { where: { uuid }, returning: true })

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
