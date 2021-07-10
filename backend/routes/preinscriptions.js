const router = require('express').Router()
const {
  postPreinscription,
  getPreinscriptions,
} = require('../controllers/preincriptionController')
const { uploadFile } = require('../service/uploads')
const { tokenVerify } = require('../utils/tokenverify')

// Get events
router.get('/:id?', getPreinscriptions)

// Post events
router.post(
  '/:id?',
  uploadFile('./files/preinscriptions', 'preinscriptions', 4),
  tokenVerify,
  postPreinscription
)

module.exports = router
