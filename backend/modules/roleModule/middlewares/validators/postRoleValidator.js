const { param, body, check } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const postRoleValidator = validate([
  body('name')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom du role`)
    .isString()
    .withMessage(`format nom de role incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le nom de role doit avoir entre 2 et 100 caractères`),
  body('descr')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la description du role`)
    .isString()
    .withMessage(`format de descrption de role incorrect`)
    .isLength({ min: 2, max: 200 })
    .withMessage(`la description doit avoir entre 2 et 200 caractères`),
])

module.exports = postRoleValidator