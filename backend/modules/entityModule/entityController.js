const dotenv = require('dotenv')
const { NotFound, BadRequest } = require('../../utils/errors')
const createEntityService = require('./services/createEntityService')
const deleteEntityService = require('./services/deleteEntityService')
const getEntityService = require('./services/getEntityService')
const listEntitiesService = require('./services/listEntitiesService')
const putEntityService = require('./services/putEntityService')

dotenv.config()

module.exports.createEntity = async (req, res, next) => {
  const datas = req.body
  try {
    const { createdEntity, createdEntityError } = await createEntityService(
      datas
    )

    if (createdEntityError) return next(createdEntityError)

    return res.status(201).send({
      message: 'votre entité a correctement été crée',
      datas: createdEntity,
    })
  } catch (error) {
    return next(error)
  }
}
module.exports.getEntity = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { requestedEntity, requestedEntityError } = await getEntityService(
      uuid
    )
    if (requestedEntityError) return next(requestedEntityError)
    if (!requestedEntity) return next(new NotFound("Cette entité n'existe pas"))
    return res.status(200).send({
      datas: requestedEntity,
    })
  } catch (error) {
    return next(error)
  }
}
module.exports.listEntities = async (req, res, next) => {
  try {
    const { entityList, entityListError } = await listEntitiesService()

    if (entityListError) return next(entityListError)
    if (!entityList || entityList.length < 1)
      return next(new NotFound('aucune entité trouvé'))
    return res.status(200).send({ datas: entityList })
  } catch (error) {
    return next(error)
  }
}
module.exports.putEntity = async (req, res, next) => {
  const { uuid } = req.params
  if (!req.body)
    return next(new BadRequest('veiller modidier un champ au moins'))

  try {
    const { updatedEntity, updatedEntityError } = await putEntityService(
      req.body,
      uuid
    )

    if (updatedEntityError) return next(updatedEntityError)

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: updatedEntity,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    return next(error)
  }
}
module.exports.deleteEntity = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { deletedEntity, deletedEntityError } = await deleteEntityService(
      uuid
    )

    if (deletedEntityError) return next(deletedEntityError)
    if (deletedEntity !== 1)
      return next(new NotFound("Cette entité n'existe pas"))
    return res.status(200).send({ message: 'entité correctement supprimée' })
  } catch (error) {
    return next(error)
  }
}
