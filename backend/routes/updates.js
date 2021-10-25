const router = require('express').Router()
const {
  postUpdatePages,
  postUpdateEntities,
  postUpdateAlbums,
  postUpdateRoles,
  postUpdateUsers,
  postUpdateChemins,
  postUpdatePapers,
  postUpdateAdaptation,
} = require('../controllers/updateController')

const { tokenVerify } = require('../utils/tokenverify')

// Post pages updates
router.post('/pages', tokenVerify, postUpdatePages)

// Post pages updates
// router.post('/entities', postUpdateEntities)

// Albums
// router.post('/albums', postUpdateAlbums)

// Roles
// router.post('/roles', postUpdateRoles)

// Users
// router.post('/users', postUpdateUsers)

// Users
// router.post('/chemins', postUpdateChemins)

// Papers
// router.post('/papers', postUpdatePapers)

// Create adaptation entities and adaptation roles
// router.post('/entities/adaptation', postUpdateAdaptation)

module.exports = router
