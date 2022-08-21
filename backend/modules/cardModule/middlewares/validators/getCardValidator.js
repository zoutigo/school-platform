const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const getCardValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'album recherché`)
    .isUUID()
    .withMessage(`le format de l'album n'est pas bon`),
])

module.exports = getCardValidator
