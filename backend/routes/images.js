const router = require('express').Router()
const multer = require('multer')
const { upLoadTinymceImage } = require('../service/uploads')

const {
  createPageImage,
  listImages,
  getImage,
  updateImage,
  deleteImage,
  createImages,
  createImage,
} = require('../controllers/imageController')

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  },
})

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
}) // Field name and max count

// create one image in dev mode with AWS
router.post('/page', createPageImage)

// create one image in production mode
router.post('/tinymce', upLoadTinymceImage(), createImage)

// creta many images
router.post('/multiple', upload.array('images', 15), createImages)

// list images
router.get('/', listImages)

// get image
router.get('/:id', getImage)

// update image
router.put('/:id', updateImage)

// delete image
router.delete('/:id', deleteImage)

module.exports = router
