const fs = require('fs')
const Album = require('../models/Album')
const AlbumP = require('../models/AlbumP')
const Entity = require('../models/Entity')
const EntityP = require('../models/EntityP')
const FileP = require('../models/FileP')
const { deleteFile, deleteFiles } = require('../utils/deleteFile')

const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { albumValidator } = require('../validators/albumValidator')

const albumIncludes = [
  {
    model: FileP,
    attributes: ['filename', 'filepath'],
  },
  {
    model: EntityP,
    attributes: ['id', 'name', 'alias'],
  },
]

module.exports.postAlbum = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, roles } = req.user
  const { id: albumId, action, entityAlias } = req.query
  const filename = req.file ? req.file.filename : null
  const filepath = req.file ? req.file.path : null

  if (action !== 'delete' && !entityAlias)
    return next(new BadRequest('entityAlias missing'))
  const entity =
    action !== 'delete'
      ? await EntityP.findOne({ where: { alias: entityAlias } })
      : null

  if (action !== 'delete') {
    if (!entity)
      return next(
        deleteFile(
          filepath,
          new BadRequest('une ou plusieurs données manquantes: entité')
        )
      )
  }

  let roleIsAllowed = false

  roles.map((role) => {
    if (JSON.stringify(entity.id === role.entity)) {
      roleIsAllowed = true
    }
  })

  const userIsAllowed = isAdmin || isManager || isModerator || roleIsAllowed

  if (Object.keys(req.body).length < 1 && action !== 'delete' && !req.file) {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(
      new Unauthorized(
        'only admin,manager and moderator, entity member are allowed '
      )
    )

  const errors = albumValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  const { name, alias, description } = req.body

  if (action === 'create') {
    if (!req.file)
      return next(new BadRequest('Please select an image to upload'))

    if (!filepath || !filename)
      return next(
        new BadRequest(
          "une ereeur s'est produite à la creation multer de l'image"
        )
      )
    if (!name || !alias || !description)
      return next(
        deleteFile(
          filepath,
          new BadRequest(
            'une ou plusieurs données manquantes: cover,name, alias, description'
          )
        )
      )

    const newAlbum = AlbumP.build(req.body)
    newAlbum.entityId = entity.id
    try {
      const savedAlbum = await newAlbum.save()
      if (savedAlbum) {
        await FileP.create({
          filename,
          filepath,
          type: 'image',
          albumId: savedAlbum.id,
        })
        return res.status(201).send({ message: 'Album correctement créee' })
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'update' && albumId) {
    // case update

    const currentAlbum = await AlbumP.findOne({
      where: { id: albumId },
      include: albumIncludes,
    })
    if (!currentAlbum) return next(new BadRequest("L'album n'existe pas"))

    const updates = {
      name: req.body.name || currentAlbum.name,
      description: req.body.description || currentAlbum.description,
      isPrivate: req.body.isPrivate,
      covername: req.file ? req.file.filename : currentAlbum.covername,
      coverpath: req.file ? req.file.path : currentAlbum.coverpath,
    }

    try {
      const updatedAlbum = await AlbumP.update(updates, {
        where: { id: albumId },
      })

      if (updatedAlbum) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Album correctement modifiée')
        }
        return res.status(200).send({
          message: 'Album correctement modifié',
          data: updatedAlbum,
        })
      }
    } catch (err) {
      return next(deleteFile(null, err))
    }
  } else if (action === 'delete' && albumId) {
    try {
      const toDeleteAlbum = await AlbumP.findOne({
        where: { id: albumId },
        include: albumIncludes,
      })
      if (!toDeleteAlbum)
        return res.status(200).send('album avait deja été supprimé')

      const deletionImageErrors = []
      toDeleteAlbum.files.forEach((file) => {
        fs.unlink(file.filepath, (err) => {
          if (err) deletionImageErrors.push(err)
        })
      })

      if (deletionImageErrors.length > 0)
        return next(deletionImageErrors.join())

      const deletedAlbum = await toDeleteAlbum.destroy()
      if (deletedAlbum)
        return res.status(200).send({ message: 'album correctement effacé' })
    } catch (err) {
      return next(err)
    }
  } else {
    return next(deleteFile(req.file.path, new BadRequest('params missing')))
  }
}

module.exports.getAlbums = async (req, res, next) => {
  const errors = albumValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  if (req.query.entityAlias) {
    const entity = await EntityP.findOne({
      where: { alias: req.query.entityAlias },
    })
    if (!entity) return next(new BadRequest("cette entité n'existe pas"))
    req.query.entityId = entity.id
    delete req.query.entityAlias
  }

  try {
    const albums = await AlbumP.findAll({
      where: req.query,
      attributes: ['id', 'name', 'alias'],
      limit: 10,
      include: albumIncludes,
    })

    if (albums.length < 1)
      return next(
        new NotFound("Il n'y a pas encore d'abum crée dans cette rubrique")
      )
    return res.status(200).send(albums)
  } catch (err) {
    return next(err)
  }
}

module.exports.postAlbumImages = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, roles } = req.user
  const { id: albumId, action, entityAlias, filepath } = req.query

  if (action !== 'delete' && (!entityAlias || !albumId))
    return next(new BadRequest('params missing: entityAlias, albumId, action '))

  const entity =
    action === 'delete'
      ? null
      : await EntityP.findOne({ where: { alias: entityAlias } })
  // if (!entity)
  //   return next(
  //     deleteFiles(
  //       req.files,
  //       new BadRequest('une ou plusieurs données manquantes: entité')
  //     )
  //   )

  let roleIsAllowed = false

  roles.map((role) => {
    if (JSON.stringify(entity.id === role.entity.id)) {
      roleIsAllowed = true
    }
  })

  const userIsAllowed = isAdmin || isManager || isModerator || roleIsAllowed

  // if (Object.keys(req.body).length < 1 && action !== 'delete' && !req.file) {
  //   return next(new BadRequest('datas missing'))
  // }

  if (!userIsAllowed)
    return next(
      new Unauthorized(
        'only admin,manager and moderator, entity member are allowed '
      )
    )

  if ((!req.files || req.files.length < 1) && action !== 'delete')
    return next(new BadRequest('les images ne sont pas telechargées'))

  // check if album exist
  const album = await AlbumP.findOne({
    where: { id: albumId },
    includes: albumIncludes,
  })

  if (!album)
    return next(deleteFiles(req.files, new BadRequest('album non identifié')))

  if (action === 'create') {
    try {
      req.files.forEach(async (file) => {
        const { filename, path } = file
        await FileP.create({
          filename,
          filepath: path,
          type: 'image',
          albumId: album.id,
        })
      })

      return res.status(200).send({ message: 'images enregistrées' })
    } catch (err) {
      return next(deleteFiles(req.files, new BadRequest(err)))
    }
  } else if (action === 'delete') {
    try {
      const deletedFile = await FileP.destroy({
        where: { albumId: albumId, filepath },
      })

      if (deletedFile) {
        fs.unlink(filepath, async (err) => {
          if (err) return err
        })
        return res.status(200).send({ message: 'image supprimée' })
      }
    } catch (err) {
      return next(new BadRequest(err))
    }
  }
}
