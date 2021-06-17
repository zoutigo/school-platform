const router = require('express').Router()
const { getRoles, postRole } = require('../controllers/roleController')
const { tokenVerify } = require('../utils/tokenverify')

// Get roles
router.get('/:id?', getRoles)

// Post roles
router.post('/:id?', tokenVerify, postRole)

module.exports = router
