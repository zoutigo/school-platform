const { param } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const deleteAlbumValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité à supprimer`)
    .isUUID()
    .withMessage(`le format de l'entité'est pas bon`),
])

module.exports = deleteAlbumValidator
