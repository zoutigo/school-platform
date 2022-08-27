const { param, body, query } = require('express-validator')
const validate = require('../../../../middlewares/validate')
const slugify = require('../../../../utils/slugify')

const listEntityValidator = validate([
  query('uuid')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité à modifier`)
    .isUUID()
    .withMessage(`le format de l'entité n'est pas bon`),
  query('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de l'entité`)
    .isString()
    .withMessage(`format nom de l'entité incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de entité doit avoir entre 2 et 100 caractères`),
  query('alias')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le alias l'entité`)
    .isString()
    .withMessage(`format alias de l'entité incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`l'alias de entité doit avoir entre 2 et 100 caractères`)
    .customSanitizer((value) => slugify(value)),
  // .isSlug()
  // .withMessage(`l'alias de entité doit etre un slug`),
  query('roleId')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le role à ajouter`)
    .isUUID()
    .withMessage(`le format du role n'est pas bon`),
])

module.exports = listEntityValidator
