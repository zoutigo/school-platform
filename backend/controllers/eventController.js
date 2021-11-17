/* eslint-disable consistent-return */
const { Op } = require('sequelize')
const moment = require('moment')
const EntityP = require('../models/EntityP')
const EventP = require('../models/EventP')
const RoleP = require('../models/RoleP')
const UserP = require('../models/UserP')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { eventValidator } = require('../validators/eventValidator')

require('dotenv').config()

const today = new Date().getTime()
const yesterday = moment().add(-1, 'days')

module.exports.postEvent = async (req, res, next) => {
  const {
    isAdmin,
    isManager,
    isModerator,
    id: userId,
    roles: requesterRoles,
  } = req.user
  const { id: eventId, action } = req.query
  const { entityAlias } = req.body

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!entityAlias) return next(new BadRequest('indiquez votre entité'))

  // check the entity
  const checkedEntity = await EntityP.findOne({
    where: { alias: entityAlias },
    include: [RoleP],
  })

  if (!checkedEntity)
    return next(
      new BadRequest(
        `L'entité correspondant à l'alias ${entityAlias} n'existe pas`
      )
    )

  const userAllowedRoles =
    requesterRoles && requesterRoles.length > 0 && checkedEntity
      ? requesterRoles.filter(
          (reqRole) => Number(reqRole.entityId) === Number(checkedEntity.id)
        )
      : []
  const roleIsAllowed = userAllowedRoles.length > 0

  const userIsAllowed = isAdmin || isManager || isModerator || roleIsAllowed

  if (!userIsAllowed)
    return next(
      new Unauthorized(
        'Seuls les gradés ou le depositaire de cette categorie peuvent effectuer cette opération '
      )
    )

  const errors = eventValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  if (action === 'create') {
    const { title, content, date, place } = req.body

    if (!title || !content || !date || !place)
      return next(
        new BadRequest(
          'Précisez toutes les informations requises: titre, contenu, date et lieu'
        )
      )

    const event = req.body
    event.entityId = checkedEntity.id
    delete event.entityAlias
    event.userId = userId

    try {
      const savedEvent = await EventP.create(event)
      if (savedEvent) {
        return res.status(201).send({ message: 'Evenement correctement crée' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && eventId) {
    // case update

    try {
      const updatedEvent = await EventP.update(req.body, {
        where: { id: eventId },
      })

      if (updatedEvent) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Evènement modifié')
        }
        return res.status(200).send({ message: 'evenement modifié' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && eventId) {
    try {
      const deletedEvent = await EventP.destroy({ where: { id: eventId } })
      if (deletedEvent) {
        return res.status(200).send({ message: 'Evènement éffacé' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('params missing'))
  }
}

module.exports.getEvents = async (req, res, next) => {
  const errors = eventValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  // check the entity
  if (req.query.entityAlias && req.query.entityAlias !== 'null') {
    const checkedEntity = await EntityP.findOne({
      where: { alias: req.query.entityAlias },
    })
    if (!checkedEntity) return next(new BadRequest('mauvaise entité'))
    req.query.entityId = checkedEntity.id
  }

  delete req.query.entityAlias

  try {
    const events = await EventP.findAll({
      where: {
        ...req.query,
      },
      include: [
        {
          model: EntityP,
          attributes: ['alias', 'id', 'name'],
        },
        {
          model: UserP,
          attributes: ['id', 'lastname'],
        },
      ],
      order: [['date', 'ASC']],
    })

    const filteredEvents = events.filter(
      (event) => moment(Number(event.date)) > yesterday
    )

    // if (filteredEvents.length < 1) return next(new NotFound('event not found'))
    return res.status(200).send(filteredEvents)
  } catch (err) {
    next(err)
  }
}
