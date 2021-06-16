/* eslint-disable consistent-return */
const Event = require('../models/Event')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { eventValidator } = require('../validators/eventValidator')

module.exports.postEvent = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, isTeacher, _id: userId } = req.user
  const { id: eventId, action } = req.query
  const userIsAllowed = isAdmin || isManager || isTeacher || isModerator

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin,teacher,manager and moderator are allowed ')
    )

  const errors = eventValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  if (action === 'create') {
    // case event creation
    const event = req.body
    event.author = userId
    const newEvent = new Event(event)
    try {
      const savedEvent = await newEvent.save()
      if (savedEvent) {
        return res.status(201).send({ message: 'Evenement correctement crée' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && eventId) {
    // case update

    try {
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedEvent) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('event successfully updated')
        }
        return res.status(200).send(updatedEvent)
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && eventId) {
    try {
      const deletedEvent = await Event.findOneAndDelete({ _id: eventId })
      if (deletedEvent) {
        return res.status(200).send('event deleted successfully')
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('params missing'))
  }
}

module.exports.getEvents = async (req, res, next) => {
  const today = new Date().getTime()

  const errors = eventValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  try {
    if (req.query.id) {
      req.query._id = req.query.id
      delete req.query.id
    }
    const events = await Event.find(req.query)
      .where('date')
      .gt(today)
      .sort({ date: 1 })

    if (events.length < 1) return next(new NotFound('event not found'))
    return res.status(200).send(events)
  } catch (err) {
    next(err)
  }
}
