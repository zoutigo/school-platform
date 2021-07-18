/* eslint-disable consistent-return */
const Entity = require('../models/Entity')
const Suggestion = require('../models/Suggestion')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { suggestionValidator } = require('../validators/suggestionValidator')

module.exports.postSuggestion = async (req, res, next) => {
  const { _id: userId } = req.user
  const { id: suggestionId, action } = req.query
  const userIsAllowed = userId

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(new Unauthorized('Uniquement reservé aux membres du site '))

  const errors = suggestionValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  if (action === 'create') {
    const suggestion = req.body

    suggestion.author = userId
    const newsuggestion = new Suggestion(suggestion)
    try {
      const savedsuggestion = await newsuggestion.save()
      if (savedsuggestion) {
        return res.status(201).send({ message: 'Suggestion prise en compte' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && suggestionId) {
    // case update

    try {
      const updatedsuggestion = await Suggestion.findOneAndUpdate(
        { _id: suggestionId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedsuggestion) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('suggestion successfully updated')
        }
        return res.status(200).send(updatedsuggestion)
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && suggestionId) {
    try {
      const deletedsuggestion = await Suggestion.findOneAndDelete({
        _id: suggestionId,
      })
      if (deletedsuggestion) {
        return res
          .status(200)
          .send({ message: 'suggestion deleted successfully' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('params missing'))
  }
}

module.exports.getSuggestions = async (req, res, next) => {
  const today = new Date().getTime()

  const errors = suggestionValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  if (req.query.id) {
    req.query._id = req.query.id
    delete req.query.id
  }

  // check the entity
  if (req.query.entityAlias) {
    const checkedEntity = await Entity.findOne({ alias: req.query.entityAlias })
    if (!checkedEntity) return next(new BadRequest('mauvaise entité'))
    req.query.entity = checkedEntity._id
    delete req.query.entityAlias
  }

  try {
    const suggestions = await Suggestion.find(req.query)
      .where('date')
      .gt(today)
      .sort({ date: 1 })
      .populate('entity')

    if (suggestions.length < 1)
      return next(new NotFound('suggestion not found'))
    return res.status(200).send(suggestions)
  } catch (err) {
    next(err)
  }
}
