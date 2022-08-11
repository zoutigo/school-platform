const router = require('express').Router()
const isAdminMiddleware = require('../authModule/middlewares/authorizations/isAdminMiddleWare')
const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
const {
  createRole,
  getRole,
  listRoles,
  putRole,
  deleteRole,
} = require('./roleController')
const getRoleValidator = require('./middlewares/validators/getRoleValidator')
const postRoleValidator = require('./middlewares/validators/postRoleValidator')
const putRoleValidator = require('./middlewares/validators/putRoleValidator')
const deleteRoleValidator = require('./middlewares/validators/deleteRoleValidator')

//  create role
router.post('/', postRoleValidator, createRole)

// get role
router.get(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  getRoleValidator,
  getRole
)

// list roles
router.get('/', verifyTokenMiddleware, listRoles)

// put role
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  putRoleValidator,
  putRole
)

// delete user
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  deleteRoleValidator,
  deleteRole
)

module.exports = router
