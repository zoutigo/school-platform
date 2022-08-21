const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const deletePageValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la page à supprimer`)
    .isUUID()
    .withMessage(`le format de la page n'est pas bon`),
])

module.exports = deletePageValidator
