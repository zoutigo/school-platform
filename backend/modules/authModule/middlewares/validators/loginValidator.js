const { body, check, oneOf, validationResult } = require('express-validator')
const { passwordPattern } = require('../../../../constants/regex')
const validate = require('../../../../middlewares/validate')

const loginValidator = validate([
  body('username')
    .not()
    .isEmpty()
    .withMessage('indiquez le nom utilisateur')
    .isEmail()
    .withMessage('format utilisateur non valide'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('indiquez le mot de pass')
    .isString()
    .withMessage('format mot de pass invalide')
    .matches(passwordPattern)
    .withMessage('format mot de pass invalide'),
])

module.exports = loginValidator
