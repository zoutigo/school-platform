const router = require('express').Router()
const { postEntity, getEntities } = require('../controllers/entityController')
const { tokenVerify } = require('../utils/tokenverify')

// Get events
router.get('/:id?', getEntities)

// Post events
router.post('/:id?', tokenVerify, postEntity)

module.exports = router
