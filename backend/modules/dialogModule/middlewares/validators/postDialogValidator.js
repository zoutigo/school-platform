const { body, check } = require('express-validator')
const validate = require('../../../../middlewares/validate')

const postDialogValidator = validate([
  body('title')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le titre du dialog`)
    .isString()
    .withMessage(`format du titre de dialog incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le titre du dialog doit avoir entre 2 et 100 caractères`),
  body('content')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le contenu`)
    .isString()
    .withMessage(`format de contenu dialog incorrect`)
    .isLength({ min: 2, max: 1000 })
    .withMessage(`le contenu doit avoir entre 2 et 1000 caractères`),
  body('startdate')
    .not()
    .isEmpty()
    .withMessage(`Veillez indiquer la date de début`)
    .custom((value, { req }) => new Date(value).getTime() > 0)
    .withMessage(`format invalide pour la date de début`),
  body('enddate')
    .not()
    .isEmpty()
    .withMessage(`Veillez indiquer la date de fin`)
    .custom((value, { req }) => new Date(value).getTime() > 0)
    .withMessage(`format invalide pour la date de début`),
  check('greather')
    .custom((value, { req }) => req.body.enddate > req.body.startdate)
    .withMessage(`La date de fin doit etre supérieure à la date de début`),
])

module.exports = postDialogValidator
