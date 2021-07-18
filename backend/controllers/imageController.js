const Image = require('../models/Image')
const { BadRequest } = require('../utils/errors')
const fileUploadService = require('../service/uploads')
require('dotenv').config()

module.exports.createPageImage = async (req, res, next) => {
  try {
    if (req.files && req.files.file) {
      const { file } = req.files

      const { fileUrl: location, filename } =
        await fileUploadService.uploadFileToAws(file)
      const newImage = new Image({
        filename: filename,
        path: location,
      })

      try {
        const savedImage = await newImage.save()
        if (savedImage) {
          return res.status(201).send({ location: location })
        }
      } catch (err) {
        return next(err)
      }
    }
    return next(new BadRequest('FILE_NOT_FOUND'))
  } catch (error) {
    return next(error)
  }
}
module.exports.createImages = async (req, res) => {
  const locations = []
  for (let i = 0; i < req.files.length; i += 1) {
    const { filename, path } = req.files[i]
    const newImage = new Image({
      filename: filename,
      path: path,
    })

    // eslint-disable-next-line no-await-in-loop
    const savedImage = await newImage.save()
    if (savedImage) {
      const location = `${process.env.SERVER_ADRESS}/${savedImage.path}`
      locations.push({ location: location })
    }
  }
  res.status(201).send(locations)
}
module.exports.createImage = async (req, res, next) => {
  if (!req.file) return next(new BadRequest('Please select an image to upload'))
  const { filename, path } = req.file
  if (!path || !filename)
    return next(
      new BadRequest(
        "une ereeur s'est produite à la creation multer de l'image"
      )
    )

  const newImage = new Image({
    filename: filename,
    path: path,
  })

  try {
    const savedImage = await newImage.save()
    if (savedImage) {
      const location =
        process.env.NODE_ENV === 'production'
          ? `${process.env.SERVER_ADRESS}/${path}`
          : `http://localhost:3500/${path}`

      return res.status(201).send({ location: location })
    }
  } catch (err) {
    return next(err)
  }
}

module.exports.listImages = () => {}
module.exports.getImage = () => {}
module.exports.updateImage = () => {}
module.exports.deleteImage = () => {}
