const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const getEntityValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité recherché`)
    .isUUID()
    .withMessage(`le format de l'entité n'est pas bon`),
])

module.exports = getEntityValidator
