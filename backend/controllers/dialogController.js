/* eslint-disable consistent-return */
const Entity = require('../models/Entity')
const Dialog = require('../models/Dialog')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { dialogValidator } = require('../validators/dialogValidator')

require('dotenv').config()

module.exports.postDialog = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, _id: userId } = req.user
  const { id: dialogId, action } = req.query
  const userIsAllowed = isAdmin || isManager || isModerator

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin, manager and moderator are allowed ')
    )

  const errors = dialogValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  if (action === 'create') {
    const dialog = req.body
    dialog.author = userId
    const newEvent = new Dialog(dialog)
    try {
      const savedDialog = await newEvent.save()
      if (savedDialog) {
        return res.status(201).send({ message: 'Modale correctement crée' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && dialogId) {
    // case update

    try {
      const updatedDialog = await Dialog.findOneAndUpdate(
        { _id: dialogId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedDialog) {
        if (process.env.NODE_ENV === 'production') {
          return res
            .status(200)
            .send({ message: 'Modale correctement modifiée' })
        }
        return res.status(200).send(updatedDialog)
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && dialogId) {
    try {
      const deletedDialog = await Dialog.findOneAndDelete({ _id: dialogId })
      if (deletedDialog) {
        return res.status(200).send({ message: 'Modale correctement éffacée' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('params missing'))
  }
}

module.exports.getDialogs = async (req, res, next) => {
  const today = new Date().getTime()

  const errors = dialogValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  if (req.query.id) {
    req.query._id = req.query.id
    delete req.query.id
  }

  try {
    const dialogs = await Dialog.find(req.query)
      .where('enddate')
      .gt(today)
      .sort({ date: 1 })

    if (dialogs.length < 1) return next(new NotFound('Pas de modale en cours'))
    return res.status(200).send(dialogs)
  } catch (err) {
    next(err)
  }
}
