const router = require('express').Router()
const { tokenVerify } = require('../utils/tokenverify')
const { getPapers, postPaper } = require('../controllers/paperController')

router.get('/:id?/:type?/:entity?/:status?', getPapers)
router.post('/:id?', tokenVerify, postPaper)

module.exports = router
