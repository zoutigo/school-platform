/* eslint-disable consistent-return */
const fs = require('fs')
const Chemin = require('../models/Chemin')
const { deleteFile } = require('../utils/deleteFile')

const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { cheminValidator } = require('../validators/cheminValidator')

module.exports.postChemin = async (req, res, next) => {
  const { isAdmin } = req.user
  const { id: cheminId, action } = req.query
  const userIsAllowed = isAdmin

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin,teacher,manager and moderator are allowed ')
    )

  const errors = cheminValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  const { path: cheminpath, alias, description } = req.body

  if (action === 'create') {
    if (!req.file)
      return next(new BadRequest('Please select an image to upload'))

    const { filename, path: filepath } = req.file

    if (!filepath || !filename)
      return next(
        new BadRequest(
          "une ereeur s'est produite à la creation multer de l'image"
        )
      )
    if (!cheminpath || !alias || !description)
      return next(
        deleteFile(
          filepath,
          new BadRequest(
            'une ou plusieurs données manquantes: path, alias, description'
          )
        )
      )

    const chemin = req.body

    const newChemin = new Chemin(chemin)
    newChemin.filepath = filepath
    newChemin.filename = filename
    try {
      const savedChemin = await newChemin.save()
      if (savedChemin) {
        return res.status(201).send({ message: 'chemin correctement créee' })
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'update' && cheminId) {
    // case update

    const currentChemin = await Chemin.findOne({ _id: cheminId })
    if (!currentChemin) return next(new BadRequest("Le chemin n'existe pas"))
    if (req.file) {
      fs.unlink(currentChemin.filepath, (err) => {
        if (err) return next(err)
      })
    }
    try {
      const updatedChemin = await Chemin.findOneAndUpdate(
        { _id: cheminId },
        {
          alias: req.body.alias || currentChemin.alias,
          path: req.body.path || currentChemin.path,
          description: req.body.description || currentChemin.description,
          filename: req.file ? req.file.filename : currentChemin.filename,
          filepath: req.file ? req.file.path : currentChemin.filepath,
        },
        {
          returnOriginal: false,
        }
      )
      if (updatedChemin) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Chemin correctement modifiée')
        }
        return res.status(200).send({
          message: 'Chemin correctement modifié',
          data: updatedChemin,
        })
      }
    } catch (err) {
      return next(deleteFile(req.file.path, err))
    }
  } else if (action === 'delete' && cheminId) {
    try {
      const deletedChemin = await Chemin.findOneAndDelete({ _id: cheminId })

      if (deletedChemin) {
        fs.unlink(deletedChemin.filepath, (err) => {
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

module.exports.getChemins = async (req, res, next) => {
  const errors = cheminValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  try {
    if (req.query.id) {
      req.query._id = req.query.id
      delete req.query.id
    }
    const chemins = await Chemin.find(req.query)

    if (chemins.length < 1) return next(new NotFound('Pas de chemin trouvé'))
    return res.status(200).send(chemins)
  } catch (err) {
    return next(err)
  }
}
