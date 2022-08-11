const { QueryTypes } = require('sequelize')
const { body, check, oneOf, validationResult } = require('express-validator')
const { passwordPattern } = require('../../../../constants/regex')
const { user, sequelize } = require('../../../../database/models')
const validate = require('../../../../middlewares/validate')

const registerValidator = validate([
  body('lastname')
    .not()
    .isEmpty()
    .withMessage('indiquez le nom utilisateur')
    .isLength({ min: 2, max: 30 })
    .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
    .trim()
    .escape(),
  body('firstname')
    .not()
    .isEmpty()
    .withMessage('indiquez le prénom utilisateur')
    .isLength({ min: 2, max: 30 })
    .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
    .trim()
    .escape(),
  body('email')
    .not()
    .isEmpty()
    .withMessage('indiquez le mail utilisateur')
    .isEmail()
    .withMessage('format email non valide')
    .custom((value) =>
      sequelize
        .query('SELECT uuid from users WHERE email = ?', {
          type: QueryTypes.SELECT,
          model: user,
          replacements: [value],
        })
        .then((usr) => {
          if (usr.length > 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('E-mail déjà utilisé')
          }
        })
    ),
  body('passwordConfirm')
    .not()
    .isEmpty()
    .withMessage('confirmez le mot de pass'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('indiquez le mot de pass')
    .isString()
    .withMessage('format mot de pass invalide')
    .matches(passwordPattern)
    .withMessage('format mot de pass invalide')
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new Error('Confirmation mot de pass incorrecte')
      }
      return true
    }),
])

module.exports = registerValidator
