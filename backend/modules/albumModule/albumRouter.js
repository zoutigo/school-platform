const router = require('express').Router()
const multer = require('multer')

const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
const {
  createAlbum,
  getAlbum,
  listAlbums,
  putAlbum,
  deleteAlbum,
} = require('./albumController')
const getAlbumValidator = require('./middlewares/validators/getAlbumValidator')
const putAlbumValidator = require('./middlewares/validators/putAlbumValidator')
const deleteAlbumValidator = require('./middlewares/validators/deleteAlbumValidator')
const postAlbumValidator = require('./middlewares/validators/postAlbumValidator')
const { imageMaxSize } = require('../../constants/maxsize')
const albumAuthorization = require('./middlewares/albumAuthorization')

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
  postAlbumValidator,
  albumAuthorization,
  createAlbum
)

// get album
router.get('/:uuid', getAlbumValidator, getAlbum)

// list albums
router.get('/', listAlbums)

// put album
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  uploadImages.array('files', 20),
  albumAuthorization,
  putAlbumValidator,
  putAlbum
)

// delete delete
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  deleteAlbumValidator,
  albumAuthorization,
  deleteAlbum
)

module.exports = router
