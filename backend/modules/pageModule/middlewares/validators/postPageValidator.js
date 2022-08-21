const { body } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const postRoleValidator = validate([
  body('title')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le titre de la page`)
    .isString()
    .withMessage(`format du titre de la page incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le titre de la page doit avoir entre 2 et 100 caractères`),
  body('content')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le contenu de la page`)
    .isString()
    .withMessage(`format du contenu de la page incorrect`)
    .isLength({ min: 2, max: 20000 })
    .withMessage(`la description doit avoir entre 2 et 20000 caractères`),
])

module.exports = postRoleValidator
