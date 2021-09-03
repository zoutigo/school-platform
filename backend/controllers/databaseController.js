/* eslint-disable no-nested-ternary */
const mongoose = require('mongoose')
const { entitiesDatas } = require('../constants/entitiesdatas')
const { pageRawContent } = require('../constants/pageRawContent')
const { pagesDatas } = require('../constants/pagesDatas')
const AlbumP = require('../models/AlbumP')
const CardP = require('../models/CardP')
const DialogP = require('../models/DialogP')
const EntityP = require('../models/EntityP')
const EventP = require('../models/EventP')
const FileP = require('../models/FileP')
const PageP = require('../models/PageP')
const PaperP = require('../models/PaperP')
const PreinscriptionP = require('../models/PreinscriptionP')
const SuggestionP = require('../models/SuggestionP')
const TestP = require('../models/TestP')
const User = require('../models/User')
const UserP = require('../models/UserP')
const {
  postUpdateUsers,
  postUpdateEntities,
  postUpdateRoles,
  postUpdatePages,
} = require('./updateController')

require('dotenv').config()

const DB_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NODE_ENV === 'test'
      ? process.env.DB_TEST
      : process.env.DB_DEV
    : process.env.DB_PROD

mongoose
  .connect(process.env.MONGO_URI || DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connexion établie à la base de donnée'))
  .catch((err) => console.log('mongo connexion error', err))

const updateModels = async () => {
  try {
    const test = await TestP.sync({ force: true })
    const user = await UserP.sync({ force: true })
    // const entity = await EntityP.sync({ force: true })
    // const page = await PageP.sync({ force: true })
    // const role = await PageP.sync({ force: true })
    // const event = await EventP.sync({ force: true })
    // const paper = await PaperP.sync({ force: true })
    // const album = await AlbumP.sync({ force: true })
    // const file = await FileP.sync({ force: true })
    // const card = await CardP.sync({ force: true })
    // const dialog = await DialogP.sync({ force: true })
    // const preinscription = await PreinscriptionP.sync({ force: true })
    // const suggestion = await SuggestionP.sync({ force: true })

    if (
      test &&
      user
      //   entity
      //   card,
      //   page &&
      //   role &&
      //   user

      //   event,
      //   preinscription,
      //   suggestion,
      //   dialog,

      //   paper,
      //   album,
      //   file
    ) {
      console.log('all sychronisation is done')
      return null
    }

    // entities
  } catch (err) {
    console.log('Script Error:', err)
    return null
  }
}

const createPages = async () => {
  pagesDatas.forEach(async (page) => {
    try {
      const newPage = await PageP.create({
        title: page.title,
        alias: page.alias,
        content: JSON.stringify(page.content),
      })
      if (newPage) console.log(`${page.title} have been created`)
    } catch (err) {
      console.log('error:', err)
    }
  })

  const createdPages = await PageP.findAll()
  console.log('pages crées:', createdPages.length)
}
const createEntities = async () => {
  entitiesDatas.forEach(async (entity) => {
    try {
      const newEntity = await EntityP.create({
        name: entity.name,
        alias: entity.alias,
        email: entity.email,
        content: JSON.stringify(pageRawContent),
      })
      if (newEntity) console.log(`${entity.name} entity have been created`)
    } catch (err) {
      console.log('error:', err)
    }
  })

  await EntityP.create({
    name: 'Administration',
    alias: 'admin',
    email: process.env.ADMIN_EMAIL,
    content: JSON.stringify(pageRawContent),
  })

  const createdEntities = await EntityP.findAll()
  console.log('entités crées:', createdEntities.length)
}

const createUsers = async () => {
  try {
    const users = await User.find()
    users.forEach(async (user) => {
      const {
        isAdmin,
        isManager,
        isModerator,
        isTeacher,
        isVerified,
        emailToken,
        losspassToken,
        email,
        password,
        lastname,
        firstname,
        gender,
        phone,
      } = user

      const newUser = await UserP.create({
        firstname,
        lastname,
        gender,
        phone,
        isAdmin,
        isManager,
        isModerator,
        isTeacher,
        isVerified,
        email,
        password,
        emailToken,
        losspassToken,
      })

      if (newUser) {
        console.log(email)
      }
    })

    const newUsers = await UserP.findAll

    if (newUsers) {
      console.log('createdUsers:', newUsers)
    }
  } catch (err) {
    console.log(err)
  }
}

try {
  updateModels()
  //   createPages()
  //   createEntities()
  //   createUsers()
  //   postUpdatePages()

  //   postUpdateRoles()
  //   postUpdateUsers()
} catch (err) {
  console.log('Error:', err)
}
