const { body } = require('express-validator')
const imageMimeTypes = require('../../../../constants/imageMimeTypes')
const validate = require('../../../../middlewares/validate')

const postCardValidator = validate([
  body('name')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de la carte`)
    .isString()
    .withMessage(`format nom de la carte incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de carte doit avoir entre 2 et 100 caractères`),
  body('descr')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la description du carte`)
    .isString()
    .withMessage(`format de descrption de carte incorrect`)
    .isLength({ min: 2, max: 300 })
    .withMessage(`la description doit avoir entre 2 et 300 caractères`),
  body('path')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer du chemin de la carte`)
    .isString()
    .withMessage(`format de descrption de carte incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`la description doit avoir entre 2 et 100 caractères`),

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

module.exports = postCardValidator
