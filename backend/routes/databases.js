const router = require('express').Router()
const { synchronizeDb } = require('../controllers/databaseController')
const { tokenVerify } = require('../utils/tokenverify')

// Post databases
router.post('/', synchronizeDb)

module.exports = router
