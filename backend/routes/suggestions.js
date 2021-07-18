const router = require('express').Router()
const {
  postSuggestion,
  getSuggestions,
} = require('../controllers/suggestionController')
const { tokenVerify } = require('../utils/tokenverify')

// Get events
router.get('/:id?', getSuggestions)

// Post events
router.post('/:id?', tokenVerify, postSuggestion)

module.exports = router
