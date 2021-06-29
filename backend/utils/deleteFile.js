const fs = require('fs')

module.exports.deleteFile = (filepath = null, error = null) => {
  console.log('deletefile')
  if (filepath) {
    fs.unlink(filepath, (err) => {
      if (err) return err
    })
  }
  if (error) return error
  return null
}
