const router = require('express').Router()

const { getVariables, getParameters } = require('./utilController')

//  get variables
router.get('/variables', getVariables)

//  get variables
router.get('/parameters', getParameters)

module.exports = router
