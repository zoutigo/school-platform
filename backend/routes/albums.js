const router = require('express').Router()
const {
  postAlbum,
  getAlbums,
  postAlbumImages,
} = require('../controllers/albumController')
const { uploadImage, uploadImages } = require('../service/uploads')
const { tokenVerify } = require('../utils/tokenverify')

// Get images
router.get('/images', getAlbums)

// Post albums images
router.post(
  '/images',
  tokenVerify,
  uploadImages('./images/albums', 'album-image', 10),
  postAlbumImages
)

// Get albums
router.get('/:id?', getAlbums)

// Post albums
router.post(
  '/',
  tokenVerify,
  uploadImage('./images/albums', 'album-cover', 5),
  postAlbum
)

module.exports = router
