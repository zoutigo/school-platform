const router = require('express').Router()
const {
  initSyncModels,
  initPages,
  initEntities,
  initAlbums,
  initRoles,
  initUsers,
  initChemins,
  initPapers,
} = require('../controllers/initController')

const { tokenVerify } = require('../utils/tokenverify')

// Get
router.get('/', (req, res) => {
  res.status(200).send('get is ok')
})

// Pages
router.post('/models', initSyncModels)

// Pages
router.post('/pages', initPages)

// Entities
router.post('/entities', initEntities)

// Albums
router.post('/albums', initAlbums)

// Roles
router.post('/roles', initRoles)

// Users
router.post('/users', initUsers)

// Users
router.post('/chemins', initChemins)

// Papers
router.post('/papers', initPapers)

module.exports = router
