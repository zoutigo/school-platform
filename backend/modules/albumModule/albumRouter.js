const router = require('express').Router()
const isAdminMiddleware = require('../authModule/middlewares/authorizations/isAdminMiddleWare')
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

//  create album
router.post('/', postAlbumValidator, createAlbum)

// get album
router.get(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  getAlbumValidator,
  getAlbum
)

// list albums
router.get('/', verifyTokenMiddleware, listAlbums)

// put album
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  putAlbumValidator,
  putAlbum
)

// delete user
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  isAdminMiddleware,
  deleteAlbumValidator,
  deleteAlbum
)

module.exports = router
