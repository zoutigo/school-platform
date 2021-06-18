const router = require('express').Router()
const { postPage, getPages } = require('../controllers/pageController')
const { tokenVerify } = require('../utils/tokenverify')

// Post Pages
router.post('/', tokenVerify, postPage)

// get pages
router.get('/:id?', getPages)

module.exports = router
