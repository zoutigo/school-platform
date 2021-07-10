const AWS = require('aws-sdk')
const dotenv = require('dotenv')
const multer = require('multer')
const fs = require('fs')
const { BadRequest } = require('../utils/errors')

dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

/**
 * upload file to aws s3
 * @param {*} file
 */
async function uploadFileToAws(file) {
  const fileName = `${new Date().getTime()}_${file.name}`
  // eslint-disable-next-line prefer-destructuring
  const mimetype = file.mimetype
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.data,
    ContentType: mimetype,
    ACL: 'public-read',
  }
  const res = await new Promise((resolve, reject) => {
    s3.upload(params, (err, data) =>
      err == null ? resolve(data) : reject(err)
    )
  })
  return { fileUrl: res.Location, filename: file.name }
}

const upLoadTinymceImage = () => {
  const productionStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      const dir = './images/tinymce'
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }

      callback(null, dir)
    },
    filename: function (req, file, callback) {
      const fileName = `${Date.now()}_${file.originalname
        .toLocaleLowerCase()
        .split(' ')
        .join('-')}_tinymce`
      callback(null, fileName)
    },
  })
  const ImageFilterProd = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new BadRequest('Allowed only .png, .jpg, .jpeg and .gif'))
    }
  }

  return multer({
    storage: productionStorage,
    limits: {
      fileSize: 4000000,
    },
    fileFilter: ImageFilterProd,
  }).single('file')
}
const uploadFile = (directory, module, limit) => {
  const productionStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, directory)
    },
    filename: function (req, file, callback) {
      const fileName = `${Date.now()}_${module}_${file.originalname
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
      return cb(new BadRequest('Allowed only pdf'))
    }
  }

  return multer({
    storage: productionStorage,
    limits: {
      fileSize: limit * 1000000,
    },
    fileFilter: ImageFilterProd,
  }).single('file')
}
const uploadImage = (directory, module, limit) => {
  const productionStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, directory)
    },
    filename: function (req, file, callback) {
      const fileName = `${Date.now()}_${module}_${file.originalname
        .toLocaleLowerCase()
        .split(' ')
        .join('-')}`
      callback(null, fileName)
    },
  })
  const ImageFilterProd = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new BadRequest('Allowed only .png, .jpg, .jpeg and .gif'))
    }
  }

  return multer({
    storage: productionStorage,
    limits: {
      fileSize: limit * 1000000,
    },
    fileFilter: ImageFilterProd,
  }).single('file')
}

module.exports = {
  uploadFileToAws,
  upLoadTinymceImage,
  uploadImage,
  uploadFile,
}
