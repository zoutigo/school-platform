const router = require('express').Router()
const { postEvent, getEvents } = require('../controllers/eventController')
const { tokenVerify } = require('../utils/tokenverify')

// Get events
router.get('/:id?', getEvents)

// Post events
router.post('/:id?', tokenVerify, postEvent)

module.exports = router
