const { param, body, check, query } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const listPageValidator = validate([
  query('uuid')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la page recherchée`)
    .isUUID()
    .withMessage(`le format la page recherchée n'est pas bon`),
  query('slug')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le slug la page recherchée`)
    .isSlug()
    .withMessage(`le format la page recherchée n'est pas bon`),
  query('title')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le titre de la page`)
    .isString()
    .withMessage(`format nom de role incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le titre de la page doit avoir entre 2 et 100 caractères`),
])

module.exports = listPageValidator
