const router = require('express').Router()
const {
  postUpdatePages,
  postUpdateEntities,
  postUpdateAlbums,
  postUpdateRoles,
  postUpdateUsers,
} = require('../controllers/updateController')

const { tokenVerify } = require('../utils/tokenverify')

// Post pages updates
// router.post('/pages', tokenVerify, postUpdatePages)

// Post pages updates
// router.post('/entities', postUpdateEntities)

// Albums
// router.post('/albums', postUpdateAlbums)

// Roles
// router.post('/roles', postUpdateRoles)

// Users
router.post('/users', postUpdateUsers)

module.exports = router
