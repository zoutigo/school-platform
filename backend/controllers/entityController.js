/* eslint-disable consistent-return */
const Entity = require('../models/Entity')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { entityValidator } = require('../validators/entityValidator')

module.exports.postEntity = async (req, res, next) => {
  const { isAdmin } = req.user
  const { id: entityId, action } = req.query
  const userIsAllowed = isAdmin

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin,teacher,manager and moderator are allowed ')
    )

  const errors = entityValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  const { name, alias } = req.body

  if (action === 'create') {
    // case event creation

    if (!name || !alias)
      return next(
        new BadRequest('une ou plusieurs données manquante: name,roles')
      )

    const entity = req.body

    const newEntity = new Entity(entity)
    try {
      const savedEntity = await newEntity.save()
      if (savedEntity) {
        return res.status(201).send({ message: 'Entité correctement créee' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && entityId) {
    // case update

    const currentEntity = await Entity.findOne({ _id: entityId })
    if (!currentEntity) return next(new BadRequest("L'entité nexiste pas"))

    try {
      const updatedEntity = await Entity.findOneAndUpdate(
        { _id: entityId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedEntity) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Entité correctement modifiée')
        }
        return res.status(200).send({
          message: 'Entité correctement modifiée',
          data: updatedEntity,
        })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && entityId) {
    try {
      const deletedEntity = await Entity.findOneAndDelete({ _id: entityId })
      if (deletedEntity) {
        return res.status(200).send({ message: 'event deleted successfully' })
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
    return next(new BadRequest(errors))
  }

  try {
    if (req.query.id) {
      req.query._id = req.query.id
      delete req.query.id
    }
    const entities = await Entity.find(req.query)

    if (entities.length < 1) return next(new NotFound('event not found'))
    return res.status(200).send(entities)
  } catch (err) {
    return next(err)
  }
}
