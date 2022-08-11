const { param, body, check } = require('express-validator')
const { passwordPattern } = require('../../../../constants/regex')
const validate = require('../../../../middlewares/validate')

const putUserValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'utilisateur recherché`)
    .isUUID()
    .withMessage(`le format utilisateur n'est pas bon`),
  body('lastname')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom`)
    .isString()
    .withMessage(`format nom incorrect`)
    .isLength({ min: 2, max: 30 })
    .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
    .trim()
    .escape(),
  body('firstname')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom`)
    .isString()
    .withMessage(`format nom incorrect`)
    .isLength({ min: 2, max: 30 })
    .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
    .trim()
    .escape(),
  body('gender')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom`)
    .isIn(['monsieur', 'madame'])
    .withMessage(`Le genre est soit monsieur , soit madame`)
    .isLength({ min: 2, max: 30 })
    .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
    .trim()
    .escape(),
  body('passwordConfirm')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez confirmer le mot de pass`)
    .isString()
    .withMessage(`format confirmation mot de pass incorrect`)
    .trim()
    .escape(),
  body('password')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom`)
    .isString()
    .withMessage(`format nom incorrect`)
    .matches(passwordPattern)
    .withMessage('format mot de pass invalide')
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new Error('Confirmation mot de pass incorrecte')
      }
      return true
    })
    .trim()
    .escape(),
  check('roles.*').isUUID(),
  check('classrooms.*').isUUID(),
])

module.exports = putUserValidator
