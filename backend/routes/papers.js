const router = require('express').Router()
const { uploadFile } = require('../service/uploads')
const { tokenVerify } = require('../utils/tokenverify')
const { getPapers, postPaper } = require('../controllers/paperController')

router.get('/:id?/:type?/:entity?/:status?', getPapers)
router.post('/:id?', uploadFile('./files', 'paper', 8), tokenVerify, postPaper)

module.exports = router
