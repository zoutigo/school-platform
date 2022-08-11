const { Unauthorized } = require('../../../../utils/errors')

const isSuperuserMiddleware = async (req, rest, next) => {
  const requester = req.user

  const requesterRoles = requester.roles.map(({ dataValues: { slug } }) => slug)

  const { uuid } = req.params

  const isOwner = JSON.stringify(requester.uuid) === JSON.stringify(uuid)
  const isAllowedRole =
    requesterRoles.includes('moderateur') ||
    requesterRoles.includes('manager') ||
    requesterRoles.includes('admin')

  const isAllowed = isOwner || isAllowedRole

  if (!isAllowed)
    return next(
      new Unauthorized("vous n'etes pas authorisés à modifier cette ressouce")
    )

  return next()
}

module.exports = isSuperuserMiddleware
