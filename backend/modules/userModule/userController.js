const dotenv = require('dotenv')
const { BadRequest, NotFound, Unauthorized } = require('../../utils/errors')
const generateTokenService = require('../authModule/services/generateTokenService')
const checkRoleService = require('./services/checkRoleService')
const deleteUserService = require('./services/deleteUserService')
const findUserService = require('./services/findUserService')
const listUsersService = require('./services/listUsersService')
const putUserClassroomService = require('./services/putUserClassroomService')
const putUserRoleService = require('./services/putUserRoleService')
const putUserService = require('./services/putUserService')

dotenv.config()

module.exports.getUser = async (req, res, next) => {
  const { uuid } = req.params

  const { requestedUser, findUserError } = await findUserService(uuid)

  if (findUserError) return next(new BadRequest(findUserError))
  if (!requestedUser) return next(new NotFound("Cet utilisateur n'existe pas"))
  return res.status(200).send(requestedUser)
}
module.exports.listUsers = async (req, res, next) => {
  const { listUsers, listUsersError } = await listUsersService()

  if (listUsersError) return next(new BadRequest(listUsersError))
  if (!listUsers) return next(new NotFound('aucun utilisateur trouvé'))
  return res.status(200).send({ datas: listUsers })
}
module.exports.putUser = async (req, res, next) => {
  const requester = req.user
  const { uuid } = req.params

  if (!req.body)
    return next(new BadRequest('veiller modidier un champ au moins'))
  const { roles, classrooms, ...rest } = req.body

  try {
    const { isAdmin, isManager, isModerator, isOwner } = checkRoleService(
      requester,
      uuid
    )

    const update = {}

    if (roles) {
      const isSuperUser = isManager || isModerator || isAdmin
      if (!isSuperUser)
        return next(
          new Unauthorized(`Vous n'avez pas les droits pour modifier le role`)
        )
      const { putUserRoleError, putRoleUser } = await putUserRoleService(
        roles,
        uuid
      )

      if (putUserRoleError) return next(putUserRoleError)

      update.user = putRoleUser
    }
    if (classrooms) {
      const { putClassroomError, putClassroomsUser } =
        await putUserClassroomService(classrooms, uuid)

      if (putClassroomError) return next(putClassroomError)
      update.user = putClassroomsUser
    }

    if (rest) {
      const { updatedUser, updatedUserError } = await putUserService(
        rest,
        uuid,
        requester
      )
      if (updatedUserError) return next(updatedUserError)
      update.user = updatedUser
    }

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: update.user,
        token: generateTokenService(isOwner ? update.user : requester),
      })

    return res.status(200).send({
      message: 'la modification a bien été effectuée',
      token: generateTokenService(isOwner ? update.user : requester),
    })
  } catch (error) {
    return next(error)
  }
}
module.exports.deleteUser = async (req, res, next) => {
  const { uuid } = req.params

  const { deletedUser, deleteUserError } = await deleteUserService(uuid)

  if (deleteUserError) return next(deleteUserError)
  if (!deletedUser) return next(new NotFound("Cet utilisateur n'existe pas"))
  return res.status(200).send({
    message: 'Utilisateur supprimé',
    datas: deletedUser,
  })
}
