const router = require('express').Router()
const { postChemin, getChemins } = require('../controllers/cheminController')
const { uploadImage } = require('../service/uploads')
const { tokenVerify } = require('../utils/tokenverify')

// Get events
router.get('/:id?', getChemins)

// Post events
router.post(
  '/:id?',
  uploadImage('./images/chemins', 'chemin', 2),
  tokenVerify,
  postChemin
)

module.exports = router
