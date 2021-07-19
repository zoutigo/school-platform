/* eslint-disable consistent-return */
const fs = require('fs')
const Paper = require('../models/Paper')
const Entity = require('../models/Entity')

const { Unauthorized, BadRequest, NotFound } = require('../utils/errors')

const { paperValidator } = require('../validators/paperValidator')
const { deleteFile } = require('../utils/deleteFile')
const User = require('../models/User')

require('dotenv').config()

module.exports.getPapers = async (req, res, next) => {
  const errors = paperValidator(req.body)
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
    const papers = await Paper.find(req.query)
      .populate('entity')
      .populate('clientEntity')
      .sort({ date: -1 })
    if (papers.length < 1) return next(new NotFound('paper not found'))
    return res.status(200).send(papers)
  } catch (err) {
    return next(err)
  }
}

module.exports.postPaper = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, isTeacher, _id: userId } = req.user
  const { id: paperId, action } = req.query
  const filename = req.file ? req.file.filename : null
  const filepath = req.file ? req.file.path : null

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }
  const userIsAllowed = isAdmin || isManager || isTeacher || isModerator
  if (!userIsAllowed)
    return next(
      new Unauthorized(
        'seuls admin,teacher,manager et moderator sont authorisés'
      )
    )

  const errors = paperValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  // check if user exits
  const user = await User.findOne({ _id: userId })
  if (!user)
    return next(
      deleteFile(filepath, new BadRequest("l'utilisateur n'existe pas"))
    )

  if (action === 'create') {
    // const paper = { ...req.body }
    // eslint-disable-next-line prefer-object-spread
    const paper = Object.assign({}, req.body)

    if (filepath) {
      paper.filepath = filepath
      paper.filename = filename
    }

    const { type, title, entityAlias, clientEntityAlias } = req.body

    if (!type || !title || !entityAlias)
      return next(
        deleteFile(
          filepath,
          new BadRequest(
            'une ou plusieurs données manquante: type,title,entityAlias,text'
          )
        )
      )
    // check client entity
    if (clientEntityAlias) {
      const checkedClientEntity = await Entity.findOne({
        alias: clientEntityAlias,
      })
      if (!checkedClientEntity)
        return next(
          deleteFile(filepath, new BadRequest('mauvaise entité client'))
        )
      paper.clientEntity = checkedClientEntity._id
      delete paper.clientEntityAlias
    }
    // check the entity
    const checkedEntity = await Entity.findOne({ alias: entityAlias })
    if (!checkedEntity)
      return next(deleteFile(filepath, new BadRequest('mauvaise entité')))

    paper.entity = checkedEntity._id
    delete paper.entityAlias

    paper.author = userId
    const newPaper = new Paper(paper)

    try {
      const savedPaper = await newPaper.save()
      if (savedPaper) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(201).send({ message: 'Document correctement crée' })
        }
        return res.status(201).send({ message: 'Document correctement créee' })
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'update' && paperId) {
    // case update

    const currentPaper = await Paper.findOne({ _id: paperId })
    if (!currentPaper)
      return next(deleteFile(filepath, new BadRequest("L'entité nexiste pas")))

    if (req.file) {
      fs.unlink(currentPaper.filepath, (err) => {
        if (err) return next(err)
      })
      req.body.filename = filename
      req.body.filepath = filepath
    }
    try {
      const updatedPaper = await Paper.findOneAndUpdate(
        { _id: paperId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedPaper) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Document correctement modifié')
        }
        return res.status(200).send({
          message: 'Document correctement modifié',
          data: updatedPaper,
        })
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'delete' && paperId) {
    try {
      const deletedPaper = await Paper.findOneAndDelete({ _id: paperId })
      const { filepath: toDeletePath } = deletedPaper
      if (toDeletePath) {
        fs.unlink(toDeletePath, (err) => {
          if (err) return next(err)
        })
      }
      if (deletedPaper) {
        return res
          .status(200)
          .send({ message: 'Document correctement supprimé' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('action or paper id missing'))
  }
}
