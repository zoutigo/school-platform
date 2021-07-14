const fs = require('fs')
const Album = require('../models/Album')
const Entity = require('../models/Entity')
const { deleteFile, deleteFiles } = require('../utils/deleteFile')

const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { albumValidator } = require('../validators/albumValidator')

module.exports.postAlbum = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, roles } = req.user
  const { id: albumId, action, entityAlias } = req.query

  const entity = await Entity.findOne({ alias: entityAlias })
  if (!entity)
    return next(
      deleteFile(
        req.file.path,
        new BadRequest('une ou plusieurs données manquantes: entité')
      )
    )

  let roleIsAllowed = false

  roles.map((role) => {
    if (JSON.stringify(entity._id === role.entity)) {
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
    return next(new BadRequest(errors))
  }

  const { name, alias, description } = req.body

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
    if (!name || !alias || !description)
      return next(
        deleteFile(
          filepath,
          new BadRequest(
            'une ou plusieurs données manquantes: cover,name, alias, description'
          )
        )
      )

    const album = req.body

    const newAlbum = new Album(album)
    newAlbum.coverpath = filepath
    newAlbum.covername = filename
    try {
      const savedAlbum = await newAlbum.save()
      if (savedAlbum) {
        return res.status(201).send({ message: 'Album correctement créee' })
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'update' && albumId) {
    // case update

    const currentAlbum = await Album.findOne({ _id: albumId })
    if (!currentAlbum) return next(new BadRequest("L'album n'existe pas"))
    if (req.file) {
      fs.unlink(currentAlbum.coverpath, (err) => {
        if (err) return next(err)
      })
    }
    try {
      const updatedAlbum = await Album.findOneAndUpdate(
        { _id: albumId },
        {
          name: req.body.name || currentAlbum.name,
          description: req.body.description || currentAlbum.description,
          covername: req.file ? req.file.filename : currentAlbum.covername,
          coverpath: req.file ? req.file.path : currentAlbum.coverpath,
        },
        {
          returnOriginal: false,
        }
      )
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
      return next(deleteFile(req.file.path, err))
    }
  } else if (action === 'delete' && albumId) {
    try {
      const deletedChemin = await Album.findOneAndDelete({ _id: albumId })

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

module.exports.getAlbums = async (req, res, next) => {
  const errors = albumValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  try {
    if (req.query.id) {
      req.query._id = req.query.id
      delete req.query.id
    }
    const albums = await Album.find(req.query)

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

  const entity = await Entity.findOne({ alias: entityAlias })
  if (!entity)
    return next(
      deleteFile(
        req.file.path,
        new BadRequest('une ou plusieurs données manquantes: entité')
      )
    )

  let roleIsAllowed = false

  roles.map((role) => {
    if (JSON.stringify(entity._id === role.entity)) {
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

  if (!req.files || req.files.length < 1)
    return next(new BadRequest('les images ne sont pas telechargées'))

  // check if album exist
  const album = await Album.findOne({ _id: albumId })
  if (!album)
    return next(deleteFiles(req.files, new BadRequest('album non identifié')))

  const { pictures } = album

  if (action === 'create') {
    for (let i = 0; i < req.files.length; i += 1) {
      const { filename, path } = req.files[i]
      pictures.push({ filename, filepath: path })
    }

    try {
      const modifiedAlbum = await album.save()
      if (modifiedAlbum)
        return res.status(200).send({ message: 'images enregistrées' })
    } catch (err) {
      return next(deleteFiles(req.files, new BadRequest(err)))
    }
  } else if (action === 'delete') {
    pictures.filter(({ filepath: path }) => path !== filepath)

    try {
      fs.unlink(filepath, (err) => {
        if (err) return err
      })
      const modifiedAlbum = await album.save()
      if (modifiedAlbum)
        return res.status(200).send({ message: 'image supprimée' })
    } catch (err) {
      return next(new BadRequest(err))
    }
  }
}
