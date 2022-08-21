const { param, body } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const deleteCardValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'album à supprimer`)
    .isUUID()
    .withMessage(`le format de l'album'est pas bon`),
])

module.exports = deleteCardValidator
