const router = require('express').Router()
const multer = require('multer')
const { upLoadTinymceImage, uploadImage } = require('../service/uploads')

const {
  createPageImage,
  listImages,
  getImage,
  updateImage,
  deleteImage,
  createImages,
  createImage,
  createEditorImage,
} = require('../controllers/imageController')

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  },
})
const EditorStorage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
}) // Field name and max count

const uploadEditorImage = multer({
  storage: EditorStorage,
  // fileFilter: fileFilter,
}) // Field name and max count

// create one image in dev mode with AWS
router.post('/page', createPageImage)

// create one image in production mode
router.post(
  '/tinymce',
  uploadImage('./images/tinymce', 'tinymce', 4),
  createImage
)

router.post('/editor', uploadEditorImage.single('file'), createEditorImage)

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
