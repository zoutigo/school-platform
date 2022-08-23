const checkRoleService = (requester, toUpdateUserUuid) => {
  const { roles, uuid: requesterUuid } = requester

  const isOwner = toUpdateUserUuid === requesterUuid
  const isAdmin =
    roles
      .map((role) => {
        const {
          dataValues: { slug },
        } = role
        return { slug }
      })
      .filter((rol) => rol.slug === 'admin').length > 0
  const isManager =
    roles
      .map((role) => {
        const {
          dataValues: { slug },
        } = role
        return { slug }
      })
      .filter((rol) => rol.slug === 'manager').length > 0
  const isModerator =
    roles
      .map((role) => {
        const {
          dataValues: { slug },
        } = role
        return { slug }
      })
      .filter((rol) => rol.slug === 'moderateur').length > 0

  return {
    isAdmin,
    isManager,
    isModerator,
    isOwner,
  }
}

module.exports = checkRoleService
