const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

const deleteFileStorageService = require('./deleteFileStorageService')

dotenv.config()

const storeImageService = async (file) => {
  try {
    const directory =
      process.env.NODE_ENV === 'test'
        ? path.join('.', 'public/images/tests', '/')
        : path.join('.', 'public/images', '/')
    const timestamp = new Date().toISOString()

    fs.access(directory, (error) => {
      if (error) {
        fs.mkdirSync(directory)
      }
    })

    const { buffer, originalname } = file
    const ref = `${timestamp}-${originalname}.webp`
    const destination = path.join(directory, ref)

    await sharp(buffer).webp({ quality: 20 }).toFile(destination)

    return { filename: ref, filepath: ref }
  } catch (error) {
    deleteFileStorageService(file.path)

    return { error: error }
  }
}

module.exports = storeImageService
