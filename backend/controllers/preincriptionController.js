/* eslint-disable consistent-return */
const fs = require('fs')
const Preinscription = require('../models/Preinscription')
const User = require('../models/User')
const {
  emailPreincriptionToUser,
  emailPreincriptionToManager,
} = require('../service/mailer')
const { deleteFile } = require('../utils/deleteFile')

const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const {
  preincriptionValidator,
} = require('../validators/preinscriptionValidator')

module.exports.postPreinscription = async (req, res, next) => {
  const { isAdmin, _id: userId } = req.user
  const { id: preinscriptionId, action } = req.query
  const { filename, filepath } = req.file
  const userIsAllowed = isAdmin || userId

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(deleteFile(filepath, new BadRequest('datas missing')))
  }

  if (!userIsAllowed)
    return next(
      deleteFile(filepath, new Unauthorized('only registered are allowed '))
    )

  const errors = preincriptionValidator(req.body)
  if (errors.length > 0) {
    return next(deleteFile(filepath, new BadRequest(errors)))
  }

  // check if user exits
  const user = await User.findOne({ _id: userId })
  if (!user)
    return next(
      deleteFile(filepath, new BadRequest("l'utilisateur n'existe pas"))
    )

  const { childFirstname } = req.body

  if (action === 'create') {
    req.body.parent = userId
    if (filepath) {
      req.body.filepath = filepath
      req.body.filename = filename
    }

    if (!childFirstname)
      return next(
        deleteFile(
          filepath,
          new BadRequest(
            'une ou plusieurs données manquantes: path, alias, description'
          )
        )
      )

    const preinscription = req.body
    const newPreincription = new Preinscription(preinscription)

    try {
      const savedPreincription = await newPreincription.save()
      if (savedPreincription) {
        const { transporter: tspUser, options: optsUser } =
          emailPreincriptionToUser(user, savedPreincription)
        const { transporteur: tspManager, options: optsManager } =
          emailPreincriptionToManager(savedPreincription)

        const results = await Promise.all(
          tspUser.sendMail(optsUser),
          tspManager.sendMail(optsManager)
        )
        if (results) {
          return res.status(201).send({ message: 'Inscription correctement' })
        }
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'update' && preinscriptionId) {
    // case update

    const currentPreinscription = await Preinscription.findOne({
      _id: preinscriptionId,
    })
    if (!currentPreinscription)
      return next(new BadRequest("Le chemin n'existe pas"))
    if (req.file) {
      fs.unlink(currentPreinscription.filepath, (err) => {
        if (err) return next(err)
      })
    }
    try {
      const updatedpreinscription = await Preinscription.findOneAndUpdate(
        { _id: preinscriptionId },
        {
          childFirstname:
            req.body.alias || currentPreinscription.childFirstname,
          status: req.body.status || currentPreinscription.status,
          verdict: req.body.verdict || currentPreinscription.verdict,
        },
        {
          returnOriginal: false,
        }
      )
      if (updatedpreinscription) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Chemin correctement modifiée')
        }
        return res.status(200).send({
          message: 'Chemin correctement modifié',
          data: updatedpreinscription,
        })
      }
    } catch (err) {
      return next(deleteFile(req.file.path, err))
    }
  } else if (action === 'delete' && preinscriptionId) {
    try {
      const deletedPreinscription = await Preinscription.findOneAndDelete({
        _id: preinscriptionId,
      })

      if (deletedPreinscription) {
        fs.unlink(deletedPreinscription.filepath, (err) => {
          if (err) return next(err)
        })
        return res.status(200).send({ message: 'chemin correctement effacé' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(deleteFile(req.file.path, new BadRequest('params missing')))
  }
}

module.exports.getPreinscriptions = async (req, res, next) => {
  const errors = preincriptionValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  try {
    if (req.query.id) {
      req.query._id = req.query.id
      delete req.query.id
    }
    const chemins = await Preinscription.find(req.query)

    if (chemins.length < 1) return next(new NotFound('Pas de chemin trouvé'))
    return res.status(200).send(chemins)
  } catch (err) {
    return next(err)
  }
}
