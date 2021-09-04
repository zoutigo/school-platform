/* eslint-disable arrow-body-style */
const AlbumP = require('../models/AlbumP')
const Entity = require('../models/Entity')
const Paper = require('../models/Paper')
const EntityP = require('../models/EntityP')
const FileP = require('../models/FileP')
const PageP = require('../models/PageP')

const RoleP = require('../models/RoleP')
const User = require('../models/User')
const UserP = require('../models/UserP')
const Chemin = require('../models/Chemin')
const { BadRequest } = require('../utils/errors')
const {
  adminEntity,
  cardsAlbum,
  papersAlbumDatas,
  secretariatEntityDatas,
} = require('../constants/mainsrows')
const CardP = require('../models/CardP')
const PaperP = require('../models/PaperP')
const Role = require('../models/Role')
const Page = require('../models/Page')
const { entitiesDatas } = require('../constants/entitiesdatas')
const { pageRawContent } = require('../constants/pageRawContent')
const { pagesDatas } = require('../constants/pagesDatas')

require('dotenv').config()

const today = new Date().getTime()

module.exports.initSyncModels = async (req, res, next) => {
  try {
    const pages = await PageP.findAll()
    if (pages.length < 1)
      return next('Une erreur est survenue ou alors aucune pas exitante')
    return res.status(200).send({ message: 'pages trouvées', data: pages })
  } catch (err) {
    return next(err)
  }
}

module.exports.initPages = async (req, res, next) => {
  const errors = []
  try {
    await PageP.sync({ force: true })
  } catch (err) {
    return next(err)
  }

  pagesDatas.forEach(async (page) => {
    try {
      const newPage = await PageP.create({
        title: page.title,
        alias: page.alias,
        content: JSON.stringify(page.content),
      })
      if (newPage) console.log(`${page.title} have been created`)
    } catch (err) {
      errors.push(err)
    }
  })

  if (errors.length > 0) return next(errors.join())

  const createdPages = await PageP.findAll()

  return res
    .status(200)
    .send({ message: 'updates pages successfull', datas: createdPages })
}

module.exports.initEntities = async (req, res, next) => {
  //   try {
  //     const reset = await EntityP.sync({ force: true })
  //     if (reset) return res.status(200).send('successfull reset')
  //     return next('reset was not done')
  //   } catch (err) {
  //     return next(err)
  //   }

  try {
    await EntityP.create({
      alias: 'admin',
      name: 'Administration',
      email: process.env.ADMIN_EMAIL,
      content: JSON.stringify(pageRawContent),
    })
    const entities = await Entity.find()

    if (entities.length > 0) {
      entities.forEach(async (entity) => {
        const { name, alias, email } = entity
        await EntityP.create({
          name,
          email,
          alias,
          content: JSON.stringify(pageRawContent),
        })
      })

      const createdEntities = await EntityP.findAll()
      if (createdEntities)
        return res
          .status(200)
          .send({ message: 'entities created', datas: createdEntities })

      return next('no entity  created')
    }
    return next('no entiy found on mongodb')
  } catch (err) {
    return next(err)
  }
}

module.exports.initAlbums = async (req, res, next) => {
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

module.exports.initRoles = async (req, res, next) => {
  //   try {
  //     const resetRole = await RoleP.sync()
  //     const resetEntity = await EntityP.sync({ alter: true })
  //     if (resetRole && resetEntity)
  //       return res.status(200).send('Rolesuccessfull reset')
  //     return next('role reset was not done')
  //   } catch (err) {
  //     return next(err)
  //   }
  try {
    const roles = await Role.find().populate('entity')
    roles.forEach(async (role) => {
      const { name, mission, entity } = role
      const [{ id: entityId }] = await EntityP.findAll({
        where: { alias: entity.alias },
      })

      const newRole = await RoleP.create({
        name,
        mission,
        entityId,
      })

      if (newRole) console.log('created')
    })
  } catch (err) {
    return next(err)
  }

  try {
    const Roles = await RoleP.findAll({
      include: EntityP,
    })
    if (Roles) return res.status(200).send({ datas: Roles })
  } catch (err) {
    return next(err)
  }
}

module.exports.initUsers = async (req, res, next) => {
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
    if (ModifiedUsers) {
      // return res.status(200).send({ users: ModifiedUsers })
      console.log('users:', ModifiedUsers)
    }
  } catch (err) {
    // return next(err)
    console.log('Error:', err)
  }
}

module.exports.initChemins = async (req, res, next) => {
  try {
    const chemins = await Chemin.find()
    const [administrationEntity] = await EntityP.findOrCreate({
      where: adminEntity,
    })

    const [cardsalbum] = await AlbumP.findOrCreate({
      where: { ...cardsAlbum, entityId: administrationEntity.id },
    })

    chemins.forEach(async (chemin) => {
      const { alias, path, description, filepath, filename } = chemin
      const [card] = await CardP.findOrCreate({
        where: { alias, path, description },
      })
      const [image] = await FileP.findOrCreate({
        where: {
          filename,
          filepath,
          filetype: 'image',
          albumId: cardsalbum.id,
        },
      })

      await card.addFile(image)
    })

    const cards = await CardP.findAll({ include: [FileP] })

    return res.status(200).send(cards)
  } catch (err) {
    return next(err)
  }
}

module.exports.initPapers = async (req, res, next) => {
  const papers = await Paper.find()
  const entities = await Entity.find()
  const Users = await User.find()
  const users = await UserP.findAll()
  const [administrationEntity] = await EntityP.findOrCreate({
    where: adminEntity,
  })
  const [papersAlbum] = await AlbumP.findOrCreate({
    where: { ...papersAlbumDatas, entityId: administrationEntity.id },
  })
  const [secretariatEntity] = await EntityP.findOrCreate({
    where: secretariatEntityDatas,
  })

  const admin = await UserP.findOne({
    where: { isAdmin: true },
  })

  papers.forEach(async (paper) => {
    const {
      author,
      entity,
      date,
      filename,
      filepath,
      type,
      enddate,
      startdate,
      title,
      isPrivate,
      content,
      clientEntity,
    } = paper

    const FournitureEntity = clientEntity
      ? entities.find((entiti) => entiti._id === clientEntity)
      : null

    const paperEntity = entities.find(
      (entit) => JSON.stringify(entit._id) === JSON.stringify(entity)
    )
    const newPaperEntity = await EntityP.findOne({
      where: { alias: paperEntity.alias },
    })

    const Author = Users.find(
      (boy) => JSON.stringify(boy._id) === JSON.stringify(author)
    )

    const newAuthor = Author
      ? users.find((usere) => usere.email === Author.email)
      : null

    const newPaper = {
      type,
      title,
      content: content || '<div>Nocontent</div>',
      classe_fourniture: FournitureEntity ? FournitureEntity.name : null,
      isPrivate: isPrivate || false,
      date: (date || today).toString(),
      startdate: (startdate || today).toString(),
      enddate: (enddate || today).toString(),
      userId: newAuthor ? newAuthor.id : admin.id,
      entityId:
        entity && newPaperEntity ? newPaperEntity.id : secretariatEntity.id,
    }

    let fileDatas = null

    if (filename && filepath) {
      fileDatas = {
        filename,
        filepath,
        filetype: 'file',
        albumId: papersAlbum.id,
      }
      const [file] = await FileP.findOrCreate({ where: fileDatas })
      const [brandPaper] = await PaperP.findOrCreate({ where: newPaper })

      if (file && brandPaper) {
        brandPaper.addFile(file)
      }
    } else {
      await PaperP.findOrCreate({ where: newPaper })
    }
  })

  const Papers = await PaperP.findAll({
    include: [FileP],
  })

  res.status(200).send(Papers)
}
