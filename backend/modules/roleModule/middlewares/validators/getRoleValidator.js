const { param, body, check } = require('express-validator')
const { passwordPattern } = require('../../../../constants/regex')
const validate = require('../../../../middlewares/validate')

const getRoleValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le role recherché`)
    .isUUID()
    .withMessage(`le format du role n'est pas bon`),
])

module.exports = getRoleValidator
