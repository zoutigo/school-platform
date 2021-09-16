/* eslint-disable consistent-return */

const EntityP = require('../models/EntityP')
const RoleP = require('../models/RoleP')
const UserP = require('../models/UserP')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { entityValidator } = require('../validators/entityValidator')

module.exports.postEntity = async (req, res, next) => {
  const {
    isAdmin,
    isManager,
    isModerator,
    id: requesterId,
    roles: requesterRoles,
  } = req.user
  const { id: entityId, action } = req.query

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  const toUpdateEntity = entityId
    ? await EntityP.findOne({ where: { id: entityId }, include: [RoleP] })
    : null

  const userAllowedRoles =
    toUpdateEntity && requesterRoles && requesterRoles.length > 0
      ? requesterRoles.filter(
          (reqRole) => Number(reqRole.entityId) === Number(entityId)
        )
      : []

  const roleIsAllowed = userAllowedRoles.length > 0

  const userIsAllowed = isAdmin || isManager || isModerator || roleIsAllowed

  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin,teacher,manager and moderator are allowed ')
    )

  const errors = entityValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  const { name, alias } = req.body

  if (action === 'create') {
    // case event creation

    if (!name || !alias)
      return next(
        new BadRequest('une ou plusieurs données manquante: name,alias')
      )

    const entity = req.body

    // const newEntity = new Entity(entity)
    try {
      const savedEntity = await EntityP.create(entity)
      if (savedEntity) {
        return res.status(201).send({ message: 'Entité correctement créee' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && entityId) {
    if (!toUpdateEntity) return next(new BadRequest("L'entité nexiste pas"))
    try {
      const updatedEntity = await EntityP.update(req.body, {
        where: { id: entityId },
      })
      if (updatedEntity) {
        return res.status(200).send({
          message: 'Entité correctement modifiée',
        })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && entityId) {
    try {
      const deletedEntity = await EntityP.destroy({ id: entityId })
      if (deletedEntity) {
        return res.status(200).send({ message: 'entity deleted successfully' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('params missing'))
  }
}

module.exports.getEntities = async (req, res, next) => {
  const errors = entityValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  try {
    const entities = await EntityP.findAll({
      where: req.query,
      include: [
        {
          model: RoleP,
          include: {
            model: UserP,
            attributes: ['lastname', 'firstname', 'gender'],
          },
        },
      ],
    })

    if (entities.length < 1) return next(new NotFound('event not found'))
    return res.status(200).send(entities)
  } catch (err) {
    return next(err)
  }
}
