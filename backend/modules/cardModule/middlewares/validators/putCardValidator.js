const { param, body, check } = require('express-validator')
const imageMimeTypes = require('../../../../constants/imageMimeTypes')
const validate = require('../../../../middlewares/validate')

const putCardValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'album à modifier`)
    .isUUID()
    .withMessage(`le format de l'album n'est pas bon`),

  body('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de l'album`)
    .isString()
    .withMessage(`format nom de la carte incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de carte doit avoir entre 2 et 100 caractères`),
  body('descr')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la description du carte`)
    .isString()
    .withMessage(`format de descrption de carte incorrect`)
    .isLength({ min: 2, max: 300 })
    .withMessage(`la description doit avoir entre 2 et 300 caractères`),
  body('path')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer du chemin de la carte`)
    .isString()
    .withMessage(`format de descrption de carte incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`la description doit avoir entre 2 et 100 caractères`),

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
    .withMessage('seuls les fichiers de type image sont acceptés'),
])

module.exports = putCardValidator
