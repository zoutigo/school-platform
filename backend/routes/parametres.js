const router = require('express').Router()

const {
  getParametres,
  postParametres,
} = require('../controllers/parametresController')
const { tokenVerify } = require('../utils/tokenverify')

router.get('/:alias?', getParametres)
router.post('/:id?', tokenVerify, postParametres)

module.exports = router
