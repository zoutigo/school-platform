const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const getPageValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la page recherchée`)
    .isUUID()
    .withMessage(`le format de la page n'est pas bon`),
])

module.exports = getPageValidator
