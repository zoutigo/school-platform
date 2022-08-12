const dotenv = require('dotenv')
const { BadRequest, NotFound, Unauthorized } = require('../../utils/errors')
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
    if (roles) {
      const { putUserRoleErrorAuth, putUserRoleError, putRoleUser } =
        await putUserRoleService(roles, uuid, requester)

      if (putUserRoleErrorAuth)
        return next(new Unauthorized(putUserRoleErrorAuth))
      if (putUserRoleError) return next(putUserRoleError)
    }
    if (classrooms) {
      const { putClassroomError, putClassroomsUser } =
        await putUserClassroomService(classrooms, uuid)

      if (putClassroomError) return next(putClassroomError)
    }

    const { updatedUser, updatedUserError } = await putUserService(
      rest,
      uuid,
      requester
    )

    if (updatedUserError) return next(updatedUserError)

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: updatedUser,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    return next(error)
  }
}
module.exports.deleteUser = async (req, res, next) => {
  const { uuid } = req.params

  const { deletedUser, deleteUserError } = await deleteUserService(uuid)

  if (deleteUserError) return next(deleteUserError)
  if (!deletedUser) return next(new NotFound("Cet utilisateur n'existe pas"))
  return res.status(200).send(deletedUser)
}
