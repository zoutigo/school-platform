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
const listEntityValidator = require('./middlewares/validators/listEntityValidator')

//  create entity
router.post('/', postEntityValidator, createEntity)

// list entities
router.get(
  '/',
  // verifyTokenMiddleware,
  listEntityValidator,
  listEntities
)
// get entity
router.get(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  getEntityValidator,
  getEntity
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
