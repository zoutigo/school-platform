const router = require('express').Router()
const multer = require('multer')
const {
  postAlbum,
  getAlbums,
  postAlbumImages,
} = require('../controllers/albumController')
const { uploadImage, uploadImages } = require('../service/uploads')
const { tokenVerify } = require('../utils/tokenverify')

const albumStorage = multer.memoryStorage()

const uploadAlbumImages = multer({
  storage: albumStorage,
  // fileFilter: fileFilter,
}) // Field name and max count

// Get images
router.get('/images', getAlbums)

// Post albums images
// router.post(
//   '/images',
//   tokenVerify,
//   uploadImages('./images/albums', 'album-image', 10),
//   postAlbumImages
// )
router.post(
  '/images',
  tokenVerify,
  uploadAlbumImages.array('files', 15),
  postAlbumImages
)

// Get albums
router.get('/:id?', getAlbums)

// Post albums
// router.post(
//   '/',
//   tokenVerify,
//   uploadImage('./images/albums', 'album-cover', 5),
//   postAlbum
// )
router.post('/', tokenVerify, uploadAlbumImages.single('file'), postAlbum)

module.exports = router
