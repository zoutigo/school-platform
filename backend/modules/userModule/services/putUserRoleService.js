const { user, entity, role } = require('../../../database/models')

const putUserRoleService = async (roles, uuid, requester) => {
  try {
    const toUpdateUser = await user.findOne({
      where: { uuid },
      include: [role, entity],
      nest: true,
      raw: true,
    })

    const superRoles = ['admin', 'manager', 'moderateur']
    const requesterRoles = await requester.getRoles()
    const requestedAllowedRole = superRoles.find((rol) =>
      requesterRoles.includes(rol.slug)
    )
    if (!requestedAllowedRole)
      return {
        putUserRoleErrorAuth: "vous n'etes pas autorisé à modifier ce role",
        putRoleUser: false,
        putUserRoleError: false,
      }

    const previousRoles = toUpdateUser.roles

    // destroy previous associations
    if (previousRoles && previousRoles.length > 0) {
      previousRoles.forEach(async (prevRole) => {
        const oldRole = await role.findOne({
          where: { uuid: prevRole.uuid },
        })
        await toUpdateUser.removeRole(oldRole)
      })
    }

    // create new associations
    roles.forEach(async (newRoleUuid) => {
      const newRole = await role.findOne({
        where: { uuid: newRoleUuid },
      })
      await toUpdateUser.addRole(newRole)
    })

    const putRoleUser = await toUpdateUser.save()

    return { putRoleUser, putUserRoleError: false, putUserRoleErrorAuth: false }
  } catch (error) {
    return {
      putRoleUser: null,
      putUserRoleError: error,
      putUserRoleErrorAuth: false,
    }
  }
}

module.exports = putUserRoleService
