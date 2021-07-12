const fs = require('fs')

module.exports.deleteFile = (filepath = null, error = null) => {
  if (filepath) {
    fs.unlink(filepath, (err) => {
      if (err) return err
    })
  }
  if (error) return error
  return null
}

module.exports.deleteFiles = (files = null, error = null) => {
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
