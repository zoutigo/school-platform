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
const UserP = require('../models/UserP')
const {
  postUpdateUsers,
  postUpdateEntities,
  postUpdateRoles,
  postUpdatePages,
} = require('./updateController')

const runTest = async () => {
  try {
    // test

    const test = await TestP.sync({ force: true })
    // const page = await PageP.sync({ force: true })
    // const entity = await EntityP.sync({ force: true })
    // const user = await UserP.sync({ force: true })
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
      test
      //   card,
      //   page &&
      //   role &&
      //   user

      //   event,
      //   preinscription,
      //   suggestion,
      //   dialog,

      //   entity,
      //   paper,
      //   album,
      //   file
    ) {
      console.log('all sychronisation is done')
    }

    // entities
  } catch (err) {
    console.log('Script Error:', err)
  }
}

const createPages = async () => {
  //   pagesDatas.forEach(async (page) => {
  //     try {
  //       const newPage = await PageP.create({
  //         title: page.title,
  //         alias: page.alias,
  //         content: JSON.stringify(page.content),
  //       })
  //       if (newPage) console.log(`${page.title} have been created`)
  //     } catch (err) {
  //       console.log('error:', err)
  //     }
  //   })

  await PageP.create({
    alias: 'teste',
    title: 'un petit test',
    constent: JSON.stringify(pageRawContent),
  })

  const createdPages = await PageP.findAll()
  console.log('pages crées:', createdPages)
}

try {
  //   runTest()
  createPages()
  //   postUpdatePages()
  //   postUpdateEntities()
  //   postUpdateRoles()
  //   postUpdateUsers()
} catch (err) {
  console.log('Error:', err)
}
