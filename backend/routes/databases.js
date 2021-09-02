const router = require('express').Router()
const { tokenVerify } = require('../utils/tokenverify')

// Post databases
router.post('/', (req, res, next) => {
  console.log('nothing to do here')
})

module.exports = router
