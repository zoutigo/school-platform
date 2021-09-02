/* eslint-disable consistent-return */
const fs = require('fs')
const CardP = require('../models/CardP')
const FileP = require('../models/FileP')
const TestP = require('../models/TestP')
const { deleteFile } = require('../utils/deleteFile')

const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { cheminValidator } = require('../validators/cheminValidator')

module.exports.postChemin = async (req, res, next) => {
  const { isAdmin, isManager } = req.user
  const { id: cheminId, action } = req.query
  const filename = req.file ? req.file.filename : null
  const filepath = req.file ? req.file.path : null
  const userIsAllowed = isAdmin || isManager

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin,teacher,manager and moderator are allowed ')
    )

  const errors = cheminValidator(req.body)
  if (errors.length > 0 && action !== 'delete') {
    return next(new BadRequest(errors.join()))
  }

  const { path: cheminpath, alias, description } = req.body

  if (action === 'create') {
    if (!req.file)
      return next(new BadRequest('Please select an image to upload'))

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

    const newChemin = CardP.build(chemin)
    newChemin.filepath = filepath
    newChemin.filename = filename
    try {
      const savedChemin = await newChemin.save()
      const savedFile = await FileP.create({
        filename,
        filepath,
        type: 'image',
        albumId: '4ae7c7ee-afaa-4d69-991b-ad318e53642d',
      })
      await savedChemin.addFile(savedFile)
      if (savedChemin) {
        return res.status(201).send({ message: 'chemin correctement créee' })
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'update' && cheminId) {
    // case update

    const currentChemin = await CardP.findOne({ where: { id: cheminId } })
    if (!currentChemin) return next(new BadRequest("Le chemin n'existe pas"))
    if (req.file) {
      fs.unlink(currentChemin.filepath, async (err) => {
        const currentFile = await FileP.findOne({
          where: { filepath: currentChemin.filepath },
        })
        await currentChemin.removeFile(currentFile)
        if (err) return next(err)
      })
    }
    try {
      const updates = {
        alias: req.body.alias || currentChemin.alias,
        path: req.body.path || currentChemin.path,
        description: req.body.description || currentChemin.description,
        filename: req.file ? req.file.filename : currentChemin.filename,
        filepath: req.file ? req.file.path : currentChemin.filepath,
      }
      const updatedChemin = await CardP.update(updates, {
        where: { id: cheminId },
      })

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
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'delete' && cheminId) {
    try {
      const toDeleteChemin = await CardP.findOne({
        where: { id: cheminId },
        include: [
          {
            model: FileP,
            attributes: ['filepath'],
          },
        ],
      })

      if (!toDeleteChemin)
        return res.status(200).send('le chemin avait deja été supprimé')
      toDeleteChemin.files.forEach((file) => {
        fs.unlink(file.filepath, (err) => {
          if (err) return next(err)
        })
      })

      const deletedChemin = await toDeleteChemin.destroy()

      if (deletedChemin) {
        return res.status(200).send({ message: 'chemin correctement effacé' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(deleteFile(filepath, new BadRequest('params missing')))
  }
}

module.exports.getChemins = async (req, res, next) => {
  const errors = cheminValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  try {
    await TestP.sync({ force: true })
    await TestP.create({
      name: 'New one',
      alias: 'dnew',
    })

    const tests = await TestP.findAll()

    const chemins = await CardP.findAll({
      where: req.query,
      attributes: ['id', 'path', 'description', 'alias'],
      include: [
        {
          model: FileP,
          attributes: ['filename', 'filepath'],
        },
      ],
    })

    // if (chemins.length < 1) return next(new NotFound('Pas de chemin trouvé'))
    // return res.status(200).send(chemins)
    return res.status(200).send(tests)
  } catch (err) {
    return next(err)
  }
}
