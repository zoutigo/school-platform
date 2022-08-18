const fs = require('fs')

const deleteFilesStorageService = (files = null, error = null) => {
  const errors = []

  if (Array.isArray(files)) {
    for (let i = 0; i < files.length; i += 1) {
      fs.unlink(files[i].path, (err) => {
        if (err) {
          errors.push(err)
        }
      })
    }
  }

  if (error) errors.push(error)
  return errors
}

module.exports = deleteFilesStorageService
