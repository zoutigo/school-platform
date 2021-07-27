const router = require('express').Router()
const { postDialog, getDialogs } = require('../controllers/dialogController')
const { tokenVerify } = require('../utils/tokenverify')

// Get events
router.get('/:id?', getDialogs)

// Post events
router.post('/:id?', tokenVerify, postDialog)

module.exports = router
