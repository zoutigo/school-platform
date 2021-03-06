/* eslint-disable consistent-return */
const fs = require('fs')
const { Unauthorized, BadRequest, NotFound } = require('../utils/errors')
const { paperValidator } = require('../validators/paperValidator')
const { deleteFile } = require('../utils/deleteFile')
const EntityP = require('../models/EntityP')
const UserP = require('../models/UserP')
const PaperP = require('../models/PaperP')
const FileP = require('../models/FileP')
const AlbumP = require('../models/AlbumP')
const { adminEntity, papersAlbumDatas } = require('../constants/mainsrows')
const RoleP = require('../models/RoleP')

require('dotenv').config()

module.exports.getPapers = async (req, res, next) => {
  const errors = paperValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  // check the entity
  if (req.query.entityAlias) {
    const checkedEntity = await EntityP.findOne({
      where: { alias: req.query.entityAlias },
    })
    if (!checkedEntity) return next(new BadRequest('mauvaise entité'))
    req.query.entityId = checkedEntity.id
    delete req.query.entityAlias
  }

  try {
    const papers = await PaperP.findAll({
      where: req.query,
      include: [
        {
          model: EntityP,
          attributes: ['id', 'name', 'alias'],
          required: true,
        },
        FileP,
      ],
      order: [['createdAt', 'DESC']],
      limit: 10,
    })

    // if (papers.length < 1) return next(new NotFound('paper not found'))
    return res.status(200).send(papers)
  } catch (err) {
    return next(err)
  }
}

module.exports.postPaper = async (req, res, next) => {
  const {
    isAdmin,
    isManager,
    isModerator,
    isTeacher,
    id: userId,
    roles: usersRoles,
  } = req.user
  const { entityAlias } = req.body
  const { id: paperId, action } = req.query
  const filename = req.file ? req.file.filename : null
  const filepath = req.file ? req.file.path : null

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
      deleteFile(
        filepath,
        new BadRequest(
          `L'entité correspondant à l'alias ${entityAlias} n'existe pas`
        )
      )
    )

  const userAllowedRoles =
    usersRoles && usersRoles.length > 0 && checkedEntity
      ? usersRoles.filter(
          (reqRole) => Number(reqRole.entityId) === Number(checkedEntity.id)
        )
      : []
  const roleIsAllowed = userAllowedRoles.length > 0

  const userIsAllowed =
    isAdmin || isManager || isTeacher || isModerator || roleIsAllowed

  if (!userIsAllowed)
    return next(
      new Unauthorized(
        'Seuls les gradés ou le depositaire de cette categorie peuvent effectuer cette opération '
      )
    )

  const errors = paperValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  try {
    // const administrationEntity = await EntityP.findOne({
    //   where: { alias: 'admin' },
    // })

    // if (!administrationEntity) return next('internal error on admin album')
    const papersAlbum = await AlbumP.findOne({
      where: { alias: 'papers' },
    })
    // const [papersAlbum] = await AlbumP.findOrCreate({
    //   where: { ...papersAlbumDatas, entityId: administrationEntity.id },
    // })

    if (!papersAlbum) return next('internal error on paper album')

    if (action === 'create') {
      // const paper = { ...req.body }
      // eslint-disable-next-line prefer-object-spread
      const paper = Object.assign({}, req.body)

      // if (filepath) {
      //   paper.filepath = filepath
      //   paper.filename = filename
      // }

      const { type, title } = req.body

      if (!type || !title || !entityAlias)
        return next(
          deleteFile(
            filepath,
            new BadRequest(
              'une ou plusieurs données manquante: type,title,entityAlias'
            )
          )
        )

      paper.entityId = checkedEntity.id
      delete paper.entityAlias

      paper.userId = userId

      try {
        const savedPaper = await PaperP.create(paper)

        if (filepath) {
          const savedFile = await FileP.create({
            filename,
            filepath,
            filetype: 'file',
            albumId: papersAlbum.id,
          })
          await savedPaper.addFile(savedFile)
        }
        if (savedPaper) {
          return res
            .status(201)
            .send({ message: 'Document correctement créee' })
        }
      } catch (err) {
        return next(deleteFile(filepath, err))
      }
    } else if (action === 'update' && paperId) {
      // case update

      const currentPaper = await PaperP.findOne({
        where: { id: paperId },
        include: [FileP],
      })
      if (!currentPaper)
        return next(
          deleteFile(filepath, new BadRequest("L'entité nexiste pas"))
        )

      if (req.file) {
        // delete previous file
        // add new file
        currentPaper.files.forEach(async (fichier) => {
          fs.unlink(fichier.filepath, async (err) => {
            if (err) return next(err)
            const toRemoveFile = await FileP.findOne({
              where: { filepath: fichier.filepath },
            })
            await currentPaper.removeFile(toRemoveFile)
          })
        })

        // fs.unlink(currentPaper.files.filepath, async (err) => {
        //   const toRemoveFile = await FileP.findOne({
        //     where: { filepath: currentPaper.files.filepath },
        //   })
        //   await currentPaper.removeFile(toRemoveFile)
        //   if (err) return next(err)
        // })

        // req.body.filename = filename
        // req.body.filepath = filepath
      }
      try {
        // add files
        if (filepath) {
          const modifiedPaper = await PaperP.findOne({
            where: { id: paperId },
            include: [FileP],
          })
          const savedFile = await FileP.create({
            filename,
            filepath,
            filetype: 'file',
            albumId: papersAlbum.id,
          })
          await modifiedPaper.addFile(savedFile)
        }

        const updatedPaper = await PaperP.update(req.body, {
          where: { id: paperId },
        })

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
        const toDeletePaper = await PaperP.findOne({
          where: { id: paperId },
          include: [FileP],
        })
        const { filepath: toDeletePath } = toDeletePaper

        if (toDeletePath) {
          fs.unlink(toDeletePath, async (err) => {
            const toRemoveFile = await FileP.findOne({
              where: { filepath: toDeletePath },
            })
            await toDeletePaper.removeFile(toRemoveFile)
            if (err) return next(err)
          })
        }
        const deletedPaper = await PaperP.destroy({ where: { id: paperId } })

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
  } catch (err) {
    return next(err)
  }
}
