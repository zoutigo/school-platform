const { Unauthorized } = require('../../../../utils/errors')

const isOwnerMiddleware = (req, rest, next) => {
  const requester = req.user
  const { uuid } = req.params

  const isOwner = JSON.stringify(requester.uuid) === JSON.stringify(uuid)

  const isAllowed = isOwner

  if (!isAllowed)
    return next(
      Unauthorized("vous n'etes pas authorisés à modifier cette ressouce")
    )

  return next()
}

module.exports = isOwnerMiddleware
