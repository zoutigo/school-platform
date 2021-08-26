/* eslint-disable consistent-return */
const { Op } = require('sequelize')
const DialogP = require('../models/DialogP')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { dialogValidator } = require('../validators/dialogValidator')

require('dotenv').config()

module.exports.postDialog = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, id: userId } = req.user
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
    dialog.userId = userId

    try {
      const savedDialog = await DialogP.create(dialog)
      if (savedDialog) {
        return res.status(201).send({ message: 'Modale correctement crée' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && dialogId) {
    // case update

    try {
      const updatedDialog = await DialogP.update(req.body, {
        where: { id: dialogId },
      })

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
      const deletedDialog = await DialogP.destroy({ where: { id: dialogId } })
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

  try {
    const dialogs = await DialogP.findAll({
      where: {
        ...req.query,
        enddate: {
          [Op.gt]: today,
        },
      },
      sort: [('createdA', 'ASC')],
      limit: 5,
    })

    if (dialogs.length < 1) return next(new NotFound('Pas de modale en cours'))
    return res.status(200).send(dialogs)
  } catch (err) {
    next(err)
  }
}
