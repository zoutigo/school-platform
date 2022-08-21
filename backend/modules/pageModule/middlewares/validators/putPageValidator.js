const { param, body, check } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const putPageValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la page recherchée`)
    .isUUID()
    .withMessage(`le format la page recherchée n'est pas bon`),
  body('title')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le titre de la page`)
    .isString()
    .withMessage(`format nom de role incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le titre de la page doit avoir entre 2 et 100 caractères`),
  body('content')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le contenu de la page`)
    .isString()
    .withMessage(`format le contenu de la page incorrect`)
    .isLength({ min: 2, max: 20000 })
    .withMessage(
      `le contenu de la page doit avoir entre 2 et 20000 caractères`
    ),
])

module.exports = putPageValidator
