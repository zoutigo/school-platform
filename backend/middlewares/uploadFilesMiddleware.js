const dotenv = require('dotenv')
const multer = require('multer')
const fs = require('fs')
const { BadRequest } = require('../utils/errors')
const { fileMaxSize } = require('../constants/maxsize')

dotenv.config()

const uploadFilesMiddleware = () => {
  const productionStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      const dir = `./public/files/${process.env.NODE_ENV}`
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      callback(null, dir)
    },
    filename: function (req, file, callback) {
      const timestamp = new Date().toISOString()
      const fileName = `${timestamp}-${file.originalname
        .toLocaleLowerCase()
        .split(' ')
        .join('-')}`
      callback(null, fileName)
    },
  })
  const ImageFilterProd = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new BadRequest('Seul les documents pdf sont authorisés'))
    }
  }

  return multer({
    storage: productionStorage,
    limits: {
      fileSize: fileMaxSize,
    },
    fileFilter: ImageFilterProd,
  }).array('files', 5)
}

module.exports = uploadFilesMiddleware
