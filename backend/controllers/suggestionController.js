/* eslint-disable consistent-return */
const Entity = require('../models/Entity')
const Suggestion = require('../models/Suggestion')
const SuggestionP = require('../models/SuggestionP')
const UserP = require('../models/UserP')
const {
  userSuggestionEmail,
  adminSuggestionEmail,
} = require('../service/mailer')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { suggestionValidator } = require('../validators/suggestionValidator')

module.exports.postSuggestion = async (req, res, next) => {
  const { id: userId, email: userEmail, firstname: userFirstname } = req.user
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
    suggestion.userId = userId
    // const newsuggestion = new Suggestion(suggestion)
    try {
      const savedsuggestion = await SuggestionP.create(suggestion)
      if (savedsuggestion) {
        const user = { email: userEmail, firstName: userFirstname }
        const { topic } = savedsuggestion

        // send email to user
        const { transporter, options } = userSuggestionEmail(suggestion, user)
        await transporter.sendMail(options, (error, info) => {
          if (error) {
            return next(error)
          }
        })

        // send email to admin
        const { transporter: adminTransporter, options: adminOptions } =
          adminSuggestionEmail(suggestion, user)

        await adminTransporter.sendMail(adminOptions, (error, info) => {
          if (error) {
            return next(error)
          }
        })

        return res.status(201).send({
          message:
            'Votre suggestion a été prise en compte et adréssée à la bonne personne',
        })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && suggestionId) {
    // case update

    try {
      const updatedsuggestion = await SuggestionP.update(req.body, {
        where: { id: suggestionId },
        retuning: true,
      })
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
      const deletedsuggestion = await SuggestionP.destroy({
        where: {
          id: suggestionId,
        },
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
  const errors = suggestionValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  try {
    const suggestions = await SuggestionP.findAll({
      where: req.query,
      order: [['createdAt', 'DESC']],
      limit: 10,
    })

    if (suggestions.length < 1)
      return next(new NotFound('suggestion not found'))
    return res.status(200).send(suggestions)
  } catch (err) {
    next(err)
  }
}
