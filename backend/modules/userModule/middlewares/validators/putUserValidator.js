const { param, body, check } = require('express-validator')
const { QueryTypes } = require('sequelize')
const { passwordPattern } = require('../../../../constants/regex')
const validate = require('../../../../middlewares/validate')
const { user, sequelize } = require('../../../../database/models')
const verifyPasswordService = require('../../../authModule/services/verifyPasswordService')

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
  body('newPasswordConfirm')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez confirmer le mot de pass`)
    .isString()
    .withMessage(`format confirmation mot de pass incorrect`)
    .matches(passwordPattern)
    .withMessage('format mot de pass invalide')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Confirmation mot de pass incorrecte')
      }
      return true
    }),
  body('newPassword')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez confirmer le mot de pass`)
    .isString()
    .withMessage(`format confirmation mot de pass incorrect`)
    .matches(passwordPattern)
    .withMessage('format mot de pass invalide'),
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
      if (value === req.body.newPassword) {
        throw new Error('Le mot de pass doit etre différent du précédent')
      }
      return true
    })
    .custom((value, { req }) =>
      sequelize
        .query('SELECT password from users WHERE uuid = ? LIMIT 1', {
          type: QueryTypes.SELECT,
          model: user,
          replacements: [req.params.uuid],
        })
        .then(async (usrs) => {
          if (!usrs.length > 0)
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(`L'utilisateur n'existe plus`)

          const verified = await verifyPasswordService(
            value,
            usrs[0].dataValues
          )
          if (!verified) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(`Le mot de pass n'est pas bon`)
          }
        })
    )

    .trim()
    .escape(),
  check('roles.*').isUUID(),
  check('classrooms.*').isUUID().withMessage('format de la classe invalide'),
])

module.exports = putUserValidator
