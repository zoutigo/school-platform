const { param, body } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const deleteAlbumValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'album à supprimer`)
    .isUUID()
    .withMessage(`le format de l'album'est pas bon`),
  body('entityUuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité de l'album`)
    .isUUID()
    .withMessage(`le format de l'entité l'album n'est pas bon`),
])

module.exports = deleteAlbumValidator
