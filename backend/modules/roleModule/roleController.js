const dotenv = require('dotenv')
const { BadRequest, NotFound, Unauthorized } = require('../../utils/errors')
const createRoleService = require('./services/createRoleService')
const deleteRoleService = require('./services/deleteRoleService')
const getRoleService = require('./services/getRoleService')
const listRoleService = require('./services/listRoleService')
const putRoleService = require('./services/putRoleService')

dotenv.config()

module.exports.createRole = async (req, res, next) => {
  const datas = req.body

  const { createdRole, createdRoleError } = await createRoleService(datas)

  if (createdRoleError) return next(createdRoleError)

  return res.status(201).send({
    message: 'le role a correctement été crée',
    datas: createdRole,
  })
}
module.exports.getRole = async (req, res, next) => {
  const { uuid } = req.params

  const { requestedRole, requestedRoleError } = await getRoleService(uuid)

  if (requestedRoleError) return next(requestedRoleError)
  if (!requestedRole) return next(new NotFound("Cet role n'existe pas"))
  return res.status(200).send({
    datas: requestedRole,
  })
}
module.exports.listRoles = async (req, res, next) => {
  const { roleList, roleListError } = await listRoleService()

  if (roleListError) return next(roleListError)
  if (!roleList || roleList.length < 1)
    return next(new NotFound('aucun role trouvé'))
  return res.status(200).send({ datas: roleList })
}
module.exports.putRole = async (req, res, next) => {
  const { uuid } = req.params

  if (!req.body)
    return next(new BadRequest('veiller modidier un champ au moins'))

  try {
    const { updatedRole, updateRoleError } = await putRoleService(
      req.body,
      uuid
    )

    if (updateRoleError) return next(updateRoleError)

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: updatedRole,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    return next(error)
  }
}
module.exports.deleteRole = async (req, res, next) => {
  const { uuid } = req.params

  const { deletedRole, deletedRoleError } = await deleteRoleService(uuid)

  if (deletedRoleError) return next(deletedRoleError)
  if (!deletedRole) return next(new NotFound("Cet utilisateur n'existe pas"))
  return res.status(200).send(deletedRole)
}
