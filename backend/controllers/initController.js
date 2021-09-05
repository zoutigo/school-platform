/* eslint-disable arrow-body-style */
const AlbumP = require('../models/AlbumP')
const Album = require('../models/Album')
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
const CardImages = require('../models/CardImages')
const PaperFiles = require('../models/PaperFiles')
const EventP = require('../models/EventP')
const DialogP = require('../models/DialogP')
const PreinscriptionP = require('../models/PreinscriptionP')
const SuggestionP = require('../models/SuggestionP')
const UserEntities = require('../models/UserEntities')
const UserRoles = require('../models/UserRoles')
const PreinscriptionFiles = require('../models/PreinscriptionFiles')

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
  //   try {
  //     const resetAlbum = await RoleP.sync({ alter: true })
  //     const resetFile = await FileP.sync({ alter: true })
  //     const resetEntity = await EntityP.sync({ alter: true })
  //     if (resetAlbum && resetEntity && resetFile)
  //       return res.status(200).send('Album successfull reset')
  //     return next('album reset was not done')
  //   } catch (err) {
  //     return next(err)
  //   }

  const createImage = async (image, ownerId) => {
    try {
      const { id: imageId } = await FileP.create({
        filepath: image.filepath,
        filename: image.filename,
        filetype: 'image',
        albumId: ownerId,
      })
      if (imageId) return imageId
    } catch (err) {
      return err
    }
    return null
  }

  try {
    const albums = await Album.find().populate('entity')
    // /// foreach bloc
    albums.forEach(async (album) => {
      const {
        name,
        alias,
        description,
        isPrivate,
        pictures,
        entity,
        coverpath: filepath,
        covername: filename,
      } = album

      const [{ id: entityId }] = await EntityP.findAll({
        where: { alias: entity.alias },
      })

      //   / create album
      const { id: albumId } = await AlbumP.create({
        name,
        alias,
        description,
        isPrivate,
        entityId: entityId,
      })

      // create images
      if (albumId) {
        for (let i = 0; i < pictures.length; i += 1) {
          createImage(pictures[i], albumId)
        }
      }
    })

    //   / return the resukt

    const ALBUMS = await AlbumP.findAll({
      include: FileP,
    })

    return res.status(200).send({ datas: ALBUMS })
  } catch (err) {
    return next(err)
  }
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
  //   try {
  //     const roles = await Role.find().populate('entity')
  //     roles.forEach(async (role) => {
  //       const { name, mission, entity } = role
  //       const [{ id: entityId }] = await EntityP.findAll({
  //         where: { alias: entity.alias },
  //       })

  //       const newRole = await RoleP.create({
  //         name,
  //         mission,
  //         entityId,
  //       })

  //       if (newRole) console.log('created')
  //     })
  //   } catch (err) {
  //     return next(err)
  //   }

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
      Errors.push(err)
    }
  }

  const users = await User.find()

  for (let i = 0; i < users.length; i += 1) {
    createUser(users[i])
  }

  if (Errors.length > 0) return next(Errors.join())
  try {
    const ModifiedUsers = await UserP.findAll({
      include: [RoleP, EntityP],
    })
    if (ModifiedUsers) {
      return res.status(200).send({ users: ModifiedUsers })
    }
  } catch (err) {
    return next(err)
  }
}

module.exports.initChemins = async (req, res, next) => {
  //   try {
  //     const resetCardImage = await CardImages.sync({ alter: true })
  //     const resetCard = await CardP.sync({ alter: true })
  //     const resetFile = await FileP.sync()

  //     if (resetCard && resetFile && resetCardImage)
  //       return res.status(200).send('Card successfull reset')
  //     return next('Card reset was not done')
  //   } catch (err) {
  //     return next(err)
  //   }

  try {
    const chemins = await Chemin.find()
    const [administrationEntity] = await EntityP.findAll({
      where: { alias: 'admin' },
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
  try {
    const resetPaperFiles = await PaperFiles.sync({ force: true })
    const resetPaper = await PaperP.sync({ force: true })
    if (resetPaper && resetPaperFiles)
      return res.status(200).send('paper successfull reset')
    return next('paper reset was not done')
  } catch (err) {
    return next(err)
  }
  //   try {
  //     const papers = await Paper.find()
  //     const entities = await Entity.find()
  //     const Users = await User.find()
  //     const users = await UserP.findAll()
  //     const [administrationEntity] = await EntityP.findOrCreate({
  //       where: adminEntity,
  //     })
  //     const [papersAlbum] = await AlbumP.findOrCreate({
  //       where: { ...papersAlbumDatas, entityId: administrationEntity.id },
  //     })
  //     const [secretariatEntity] = await EntityP.findOrCreate({
  //       where: secretariatEntityDatas,
  //     })
  //     const admin = await UserP.findOne({
  //       where: { isAdmin: true },
  //     })
  //     papers.forEach(async (paper) => {
  //       const {
  //         author,
  //         entity,
  //         date,
  //         filename,
  //         filepath,
  //         type,
  //         enddate,
  //         startdate,
  //         title,
  //         isPrivate,
  //         content,
  //         clientEntity,
  //       } = paper
  //       const FournitureEntity = clientEntity
  //         ? entities.find((entiti) => entiti._id === clientEntity)
  //         : null
  //       const paperEntity = entities.find(
  //         (entit) => JSON.stringify(entit._id) === JSON.stringify(entity)
  //       )
  //       const newPaperEntity = await EntityP.findOne({
  //         where: { alias: paperEntity.alias },
  //       })
  //       const Author = Users.find(
  //         (boy) => JSON.stringify(boy._id) === JSON.stringify(author)
  //       )
  //       const newAuthor = Author
  //         ? users.find((usere) => usere.email === Author.email)
  //         : null
  //       const newPaper = {
  //         type,
  //         title,
  //         content: JSON.stringify(pageRawContent),
  //         classe_fourniture: FournitureEntity ? FournitureEntity.name : null,
  //         isPrivate: isPrivate || false,
  //         date: (date || today).toString(),
  //         startdate: (startdate || today).toString(),
  //         enddate: (enddate || today).toString(),
  //         userId: newAuthor ? newAuthor.id : admin.id,
  //         entityId:
  //           entity && newPaperEntity ? newPaperEntity.id : secretariatEntity.id,
  //       }
  //       let fileDatas = null
  //       if (filename && filepath) {
  //         fileDatas = {
  //           filename,
  //           filepath,
  //           filetype: 'file',
  //           albumId: papersAlbum.id,
  //         }
  //         const [file] = await FileP.findOrCreate({ where: fileDatas })
  //         const [brandPaper] = await PaperP.findOrCreate({ where: newPaper })
  //         if (file && brandPaper) {
  //           brandPaper.addFile(file)
  //         }
  //       } else {
  //         await PaperP.findOrCreate({ where: newPaper })
  //       }
  //     })
  //     const Papers = await PaperP.findAll({
  //       include: [FileP],
  //     })
  //     res.status(200).send(Papers)
  //   } catch (err) {
  //     return next(err)
  //   }
}

module.exports.initEvents = async (req, res, next) => {
  try {
    const resetEvents = await EventP.sync({ force: true })
    const resetUsers = await UserP.sync({ force: true })
    const resetUserEntities = await UserEntities.sync({ force: true })
    const resetUserRoles = await UserRoles.sync()
    const resetDialogs = await DialogP.sync({ force: true })
    const resetPreinscriptions = await PreinscriptionP.sync({ force: true })
    const resetPreinscriptionsFiles = await PreinscriptionFiles.sync({
      force: true,
    })
    const suggestions = await SuggestionP.sync({ force: true })

    if (
      resetUsers &&
      resetEvents &&
      resetDialogs &&
      suggestions &&
      resetUserEntities &&
      resetUserRoles &&
      resetPreinscriptions &&
      resetPreinscriptionsFiles
    )
      return res.status(200).send('paper successfull reset')
    return next('paper reset was not done')
  } catch (err) {
    return next(err)
  }
}

module.exports.initRepair = async (req, res, next) => {
  try {
    const cardImages = await PaperP.sync({ fore: true })

    if (cardImages) {
      const chemins = await Chemin.find()
      const [administrationEntity] = await EntityP.findAll({
        where: { alias: 'admin' },
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
    }
    return next('card reset was not done')
  } catch (err) {
    return next(err)
  }
}
