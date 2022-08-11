const router = require('express').Router()
const { getUser, listUsers, putUser, deleteUser } = require('./userController')
const getUserValidator = require('./middlewares/validators/getUserValidator')
const listUsersValidator = require('./middlewares/validators/listUsersValidator')
const putUserValidator = require('./middlewares/validators/putUserValidator')
const deleteUserValidator = require('./middlewares/validators/deleteUserValidator')
const isSuperuserMiddleware = require('../authModule/middlewares/authorizations/isSuperuserMiddleware')
const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
// get user
router.get('/:uuid', getUserValidator, getUser)

// list users
router.get('/', listUsers)

// put user
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  isSuperuserMiddleware,
  putUserValidator,
  putUser
)

// delete user
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  isSuperuserMiddleware,
  deleteUserValidator,
  deleteUser
)

module.exports = router
