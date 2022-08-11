const { Unauthorized } = require('../../../../utils/errors')

const isAdminMiddleware = (req, rest, next) => {
  const requester = req.user

  const requesterRoles = requester.roles

  const roles = requesterRoles.map(({ dataValues: { slug } }) => slug)

  const isAdmin = roles.includes('admin')

  const isAllowed = isAdmin

  if (!isAllowed)
    return next(
      new Unauthorized("vous n'etes pas authorisés à modifier cette ressouce")
    )

  return next()
}

module.exports = isAdminMiddleware
