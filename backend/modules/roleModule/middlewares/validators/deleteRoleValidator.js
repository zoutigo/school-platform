const { param, body, check } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const deleteRoleValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le role à supprimer`)
    .isUUID()
    .withMessage(`le format du role n'est pas bon`),
])

module.exports = deleteRoleValidator
