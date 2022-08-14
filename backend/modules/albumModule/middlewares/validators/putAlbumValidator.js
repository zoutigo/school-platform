const { param, body } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const putAlbumValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité à modifier`)
    .isUUID()
    .withMessage(`le format de l'entité n'est pas bon`),
  body('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de l'entité`)
    .isString()
    .withMessage(`format nom de l'entité incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de entité doit avoir entre 2 et 100 caractères`),
  body('email')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le mail de l'entité`)
    .isEmail()
    .withMessage('format email non valide'),
  body('content')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la description du entité`)
    .isString()
    .withMessage(`format de descrption de entité incorrect`)
    .isLength({ min: 2, max: 200000 })
    .withMessage(`la description doit avoir entre 2 et 20000 caractères`),
])

module.exports = putAlbumValidator
