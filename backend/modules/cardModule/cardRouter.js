const router = require('express').Router()
const multer = require('multer')

const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
const {
  createCard,
  getCard,
  listCards,
  putCard,
  deleteCard,
} = require('./cardController')
const getCardValidator = require('./middlewares/validators/getCardValidator')
const putCardValidator = require('./middlewares/validators/putCardValidator')
const deleteCardValidator = require('./middlewares/validators/deleteCardValidator')
const postCardValidator = require('./middlewares/validators/postCardValidator')
const { imageMaxSize } = require('../../constants/maxsize')
const isAdminMiddleware = require('../authModule/middlewares/authorizations/isAdminMiddleWare')

const storage = multer.memoryStorage()

const uploadImages = multer({
  storage: storage,
  limits: {
    fileSize: imageMaxSize,
  },
})

//  create album
router.post(
  '/',
  verifyTokenMiddleware,
  uploadImages.array('files', 20),
  postCardValidator,
  isAdminMiddleware,
  createCard
)

// get album
router.get('/:uuid', getCardValidator, getCard)

// list albums
router.get('/', listCards)

// put album
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  uploadImages.array('files', 20),
  isAdminMiddleware,
  putCardValidator,
  putCard
)

// delete delete
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  deleteCardValidator,
  isAdminMiddleware,
  deleteCard
)

module.exports = router
