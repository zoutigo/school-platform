const { body } = require('express-validator')
const imageMimeTypes = require('../../../../constants/imageMimeTypes')
const validate = require('../../../../middlewares/validate')

const postAlbumValidator = validate([
  body('entityUuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité de l'album`)
    .isUUID()
    .withMessage(`le format de l'entité l'album n'est pas bon`),
  body('name')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de l'album`)
    .isString()
    .withMessage(`format nom de l'album incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de album doit avoir entre 2 et 100 caractères`),
  body('descr')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la description du album`)
    .isString()
    .withMessage(`format de descrption de album incorrect`)
    .isLength({ min: 2, max: 300 })
    .withMessage(`la description doit avoir entre 2 et 300 caractères`),
  body('isPrivate')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la confidentialité de l'album`)
    .isBoolean()
    .withMessage(`format de la confidentialité de l'album incorrect`),
  body('files')
    .custom((value, { req }) => {
      if (req.files && req.files.length > 0) {
        return true
      }
      return false
    })
    .withMessage('Veillez telecharger au moins une image ')
    .custom((value, { req }) => {
      let isValid = true

      req.files.forEach((file) => {
        if (!imageMimeTypes.includes(file.mimetype)) {
          isValid = false
        }
      })

      return isValid
    })
    .withMessage('seuls les fichiers de type image sont acceptés'),
])

module.exports = postAlbumValidator
