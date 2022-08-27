const { query } = require('express-validator')
const imageMimeTypes = require('../../../../constants/imageMimeTypes')
const validate = require('../../../../middlewares/validate')

const listAlbumValidator = validate([
  query('entityUuid')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité de l'album`)
    .isUUID()
    .withMessage(`le format de l'entité l'album n'est pas bon`),
  query('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de l'album`)
    .isString()
    .withMessage(`format nom de l'album incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de album doit avoir entre 2 et 100 caractères`),
  query('slug')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le slug de l'album`)
    .isString()
    .withMessage(`format slug de l'album incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le slug de album doit avoir entre 2 et 100 caractères`)
    .isSlug()
    .withMessage(`le slug de album doit avoir entre 2 et 100 caractères`),
  query('descr')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la description du album`)
    .isString()
    .withMessage(`format de descrption de album incorrect`)
    .isLength({ min: 2, max: 300 })
    .withMessage(`la description doit avoir entre 2 et 300 caractères`),
  query('isPrivate')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la confidentialité de l'album`)
    .isBoolean()
    .withMessage(`format de la confidentialité de l'album incorrect`),
])

module.exports = listAlbumValidator
