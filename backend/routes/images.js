const router = require('express').Router()
const multer = require('multer')
const fileUpload = require('express-fileupload')
// const fs = require('fs')

router.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
)

const {
  createPageImage,
  listImages,
  getImage,
  updateImage,
  deleteImage,
  createImages,
} = require('../controllers/imageController')

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     const dir =
//       process.env.NODE_ENV === "development" ? "./private" : "./public";

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }

//     callback(null, dir);
//   },
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + "_" + file.originalname);
//   },
// });

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  },
})

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
}) // Field name and max count

// create one image
router.post('/page', createPageImage)

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
