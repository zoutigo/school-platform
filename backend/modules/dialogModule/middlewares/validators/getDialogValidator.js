const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const getDialogValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer du dialogue recherchée`)
    .isUUID()
    .withMessage(`le format du dialogue n'est pas bon`),
])

module.exports = getDialogValidator
