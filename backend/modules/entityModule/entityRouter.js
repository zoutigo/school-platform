const router = require('express').Router()
const isAdminMiddleware = require('../authModule/middlewares/authorizations/isAdminMiddleWare')
const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
const {
  createEntity,
  getEntity,
  listEntities,
  putEntity,
  deleteEntity,
} = require('./entityController')
const getEntityValidator = require('./middlewares/validators/getEntityValidator')
const putEntityValidator = require('./middlewares/validators/putEntityValidator')
const deleteEntityValidator = require('./middlewares/validators/deleteEntityValidator')
const postEntityValidator = require('./middlewares/validators/postEntityValidators')

//  create entity
router.post('/', postEntityValidator, createEntity)

// get entity
router.get(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  getEntityValidator,
  getEntity
)

// list entities
router.get(
  '/',
  // verifyTokenMiddleware,
  listEntities
)

// put entity
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  putEntityValidator,
  putEntity
)

// delete user
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  deleteEntityValidator,
  deleteEntity
)

module.exports = router
