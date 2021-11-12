const router = require('express').Router()
const { postMails, getMails } = require('../controllers/mailsController')
const { tokenVerify } = require('../utils/tokenverify')

// Get events
router.get('/:id?', getMails)

// Post events
router.post('/:id?', tokenVerify, postMails)

module.exports = router
