const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const deleteUserValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'utilisateur`)
    .isUUID()
    .withMessage(`format de utilisateur incorrect`),
])

module.exports = deleteUserValidator
