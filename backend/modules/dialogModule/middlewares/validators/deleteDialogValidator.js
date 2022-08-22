const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const deleteDialogValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer dialogue à supprimer`)
    .isUUID()
    .withMessage(`le format du dialogue  n'est pas bon`),
])

module.exports = deleteDialogValidator
