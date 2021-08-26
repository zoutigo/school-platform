const Album = require('../models/Album')
const AlbumImage = require('../models/AlbumImage')
const AlbumP = require('../models/AlbumP')
const Entity = require('../models/Entity')
const EntityP = require('../models/EntityP')
const FileP = require('../models/FileP')
const PageP = require('../models/PageP')
const Role = require('../models/Role')
const RoleP = require('../models/RoleP')
const User = require('../models/User')
const UserP = require('../models/UserP')
const { BadRequest } = require('../utils/errors')

module.exports.postUpdatePages = async (req, res, next) => {
  const [{ content }] = await PageP.findAll({ where: { id: 2 } })

  const pages = await PageP.findAll()
  const errors = []

  pages.forEach(async (page) => {
    try {
      const updated = await PageP.update(
        { content: content },
        { where: { id: page.id } }
      )
      if (updated) console.log(`${page.name} have been updated`)
    } catch (err) {
      errors.push(err)
    }
  })

  if (errors.length > 0) return next(errors.join())
  return res.status(200).send({ message: 'updates pages successfull' })
}

module.exports.postUpdateEntities = async (req, res, next) => {
  const entities = await Entity.find()
  const [{ content }] = await PageP.findAll({ where: { id: 2 } })
  const errors = []

  try {
    const entry = await EntityP.create({
      name: 'La boulangère',
      alias: 'boulanger',
      email: 'boloanger@yahoo.fr',
      content: 'hello',
    })
    if (entry) console.log('done')
  } catch (err) {
    errors.push(err)
  }

  entities.forEach(async (entity) => {
    const nextEntity = {
      name: entity.name,
      alias: entity.alias,
      email: entity.email,
      content: content,
    }
    try {
      const newEntity = await EntityP.create(nextEntity)
      if (newEntity) console.log(`${entity.name} have been created`)
    } catch (err) {
      errors.push(err)
    }
  })

  if (errors.length > 0) return next(new BadRequest(errors.join()))
  return res.status(200).send({ message: 'entities created successfully' })
}

module.exports.postUpdateAlbums = async (req, res, next) => {
  // const createImage = async (image, ownerId) => {
  //   try {
  //     const { id: imageId } = await FileP.create({
  //       filepath: image.filepath,
  //       filename: image.filename,
  //       filetype: 'image',
  //       albumId: ownerId,
  //     })
  //     if (imageId) return imageId
  //   } catch (err) {
  //     return err
  //   }
  //   return null
  // }

  // const albums = await Album.find().populate('entity')
  // /// foreach bloc
  // albums.forEach(async (album) => {
  //   const {
  //     name,
  //     alias,
  //     description,
  //     isPrivate,
  //     pictures,
  //     entity,
  //     coverpath: filepath,
  //     covername: filename,
  //   } = album

  //   const [{ id: entityId }] = await EntityP.findAll({
  //     where: { alias: entity.alias },
  //   })

  //   /// create album
  //   const { id: albumId } = await AlbumP.create({
  //     name,
  //     alias,
  //     description,
  //     isPrivate,
  //     entity_id: entityId,
  //   })

  //   // create images
  //   if (albumId) {
  //     for (let i = 0; i < pictures.length; i += 1) {
  //       createImage(pictures[i], albumId)
  //     }
  //   }
  // })

  /// return the resukt

  const ALBUMS = await AlbumP.findAll({
    include: FileP,
  })

  return res.status(200).send({ datas: ALBUMS })
}

module.exports.postUpdateRoles = async (req, res, next) => {
  // const roles = await Role.find().populate('entity')

  // try {
  //   roles.forEach(async (role) => {
  //     const { name, mission, entity } = role
  //     const [{ id: entityId }] = await EntityP.findAll({
  //       where: { alias: entity.alias },
  //     })

  //     const newRole = await RoleP.create({
  //       name,
  //       mission,
  //       entityId,
  //     })

  //     if (newRole) return null
  //   })
  // } catch (err) {
  //   return next(err)
  // }

  try {
    const Roles = await RoleP.findAll({
      include: EntityP,
    })
    if (Roles) return res.status(200).send({ datas: Roles })
  } catch (err) {
    return next(err)
  }
}

module.exports.postUpdateUsers = async (req, res, next) => {
  const users = await User.find()
  console.log(users.length)
  const Errors = []

  const createUser = async (user) => {
    try {
      const newUser = await UserP.create(
        {
          lastname: user.lastname,
          firstname: user.firstname,
          gender: user.gender,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          isManager: user.isManager,
          isModerator: user.isModerator,
          isTeacher: user.isTeacher,
          isVerified: user.isVerified,
          password: user.password,
          emailToken: user.emailToken,
          losspassToken: user.losspassToken,
        },
        { returning: true }
      )
      if (newUser) console.log('user migrated')
    } catch (err) {
      console.log(err)
      Errors.push(err)
    }
  }

  for (let i = 0; i < users.length; i += 1) {
    createUser(users[i])
  }

  if (Errors.length > 0) return next(Errors.join())
  try {
    const ModifiedUsers = await UserP.findAll({
      include: [RoleP, EntityP],
    })
    if (ModifiedUsers) return res.status(200).send({ users: ModifiedUsers })
  } catch (err) {
    return next(err)
  }
}
