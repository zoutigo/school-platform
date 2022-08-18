const { user, entity, role } = require('../../../database/models')

const putUserRoleService = async (roles, uuid, requester) => {
  try {
    const toUpdateUser = await user.findOne({
      where: { uuid },
      include: [role, entity],
    })

    const superRoles = ['admin', 'manager', 'moderateur']
    const requesterRoles = requester.roles.map(
      ({ dataValues: { slug } }) => slug
    )

    const requestedAllowedRoles = requesterRoles.map((rol) =>
      superRoles.includes(rol)
    )

    if (requestedAllowedRoles < 0)
      return {
        putUserRoleErrorAuth: "vous n'etes pas autorisé à modifier ce role",
        putRoleUser: false,
        putUserRoleError: false,
      }

    // const previousRoles = toUpdateUser.roles

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

    return { putRoleUser, putUserRoleError: false, putUserRoleErrorAuth: false }
  } catch (error) {
    console.log('error', error)
    return {
      putRoleUser: null,
      putUserRoleError: error.message,
      putUserRoleErrorAuth: false,
    }
  }
}

module.exports = putUserRoleService
