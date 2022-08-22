const router = require('express').Router()
const isAdminMiddleware = require('../authModule/middlewares/authorizations/isAdminMiddleWare')
const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
const {
  createPage,
  getPage,
  listPages,
  putPage,
  deletePage,
} = require('./pageController')
const postPageValidator = require('./middlewares/validators/postPageValidator')
const putPageValidator = require('./middlewares/validators/putPageValidator')
const deletePagevalidator = require('./middlewares/validators/deletePageValidator')
const isSuperuserMiddleware = require('../authModule/middlewares/authorizations/isSuperuserMiddleware')
const getPageValidator = require('./middlewares/validators/getPageValidator')

//  create page
router.post(
  '/',
  verifyTokenMiddleware,
  isAdminMiddleware,
  postPageValidator,
  createPage
)

// get page
router.get('/:uuid', getPageValidator, getPage)

// list roles
router.get('/', listPages)

// put page
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  isSuperuserMiddleware,
  putPageValidator,
  putPage
)

// delete user
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  deletePagevalidator,
  deletePage
)

module.exports = router
