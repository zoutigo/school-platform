const { user, entity, role } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const putUserRoleService = async (roles, uuid) => {
  try {
    const toUpdateUser = await user.findOne({
      where: { uuid },
      include: [role, entity],
    })

    // destroy previous associations

    await toUpdateUser.setRoles([])

    const newRoles = await Promise.all(
      roles.map(async (roleUuid) => {
        const newRole = await role.findOne({ where: { uuid: roleUuid } })
        return newRole
      })
    )
    await toUpdateUser.setRoles(newRoles)

    const putRoleUser = await user.findOne({
      where: { uuid },
      attributes: { exclude: ['id', 'password'] },
      include: [role, entity],
      nest: true,
      raw: true,
    })

    // console.log('updateduser:', putRoleUser)

    return { putRoleUser, putUserRoleError: false }
  } catch (error) {
    errorLogger('putUserRoleService', error)
    return {
      putRoleUser: null,
      putUserRoleError: error.message,
    }
  }
}

module.exports = putUserRoleService
