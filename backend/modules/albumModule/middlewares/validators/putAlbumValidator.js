const { param, body, check } = require('express-validator')
const imageMimeTypes = require('../../../../constants/imageMimeTypes')
const validate = require('../../../../middlewares/validate')

const putAlbumValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'album à modifier`)
    .isUUID()
    .withMessage(`le format de l'album n'est pas bon`),
  body('entityUuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité de l'album`)
    .isUUID()
    .withMessage(`le format de l'entité l'album n'est pas bon`),
  body('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de l'album`)
    .isString()
    .withMessage(`format nom de l'album incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de album doit avoir entre 2 et 100 caractères`),
  body('descr')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la description du album`)
    .isString()
    .withMessage(`format de descrption de album incorrect`)
    .isLength({ min: 2, max: 300 })
    .withMessage(`la description doit avoir entre 2 et 300 caractères`),
  body('isPrivate')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la confidentialité de l'album`)
    .isBoolean()
    .withMessage(`format de la confidentialité de l'album incorrect`),
  check('todeletefilesUuids.*')
    // .optional()
    .isUUID()
    .withMessage(`le format des images doit etre en uuid`),
  body('files')
    .optional()
    .custom((value, { req }) => {
      if (req.files && req.files.length > 0) {
        return true
      }
      return false
    })
    .withMessage('Veillez telecharger au moins une image ')
    .optional()
    .custom((value, { req }) => {
      let isValid = true

      req.files.forEach((file) => {
        if (!imageMimeTypes.includes(file.mimetype)) {
          isValid = false
        }
      })

      return isValid
    })
    .withMessage('seuls les fichiers de type image sont acceptés')
    .custom((value, { req }) => {
      const { filesaction } = req.body

      if (filesaction) {
        return true
      }

      return false
    })
    .withMessage(`indiquer l'action à mener pour ces images`),
])

module.exports = putAlbumValidator
