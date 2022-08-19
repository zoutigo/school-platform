const { QueryTypes } = require('sequelize')

const { param, body, check } = require('express-validator')
const imageMimeTypes = require('../../../../constants/imageMimeTypes')
const validate = require('../../../../middlewares/validate')
const { entity, paper, sequelize } = require('../../../../database/models')
const paperVariantList = require('../../../../constants/paperVariantList')

const putPaperValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'post à modifier`)
    .isUUID()
    .withMessage(`le format de l'post n'est pas bon`)
    .custom((value) =>
      sequelize
        .query('SELECT uuid from papers WHERE uuid = ? LIMIT 1', {
          type: QueryTypes.SELECT,
          model: paper,
          replacements: [value],
        })
        .then((ent) => {
          if (!ent.length > 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(`le post n'existe plus`)
          }
        })
    ),
  body('entityUuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité de l'post`)
    .isUUID()
    .withMessage(`le format de l'entité l'post n'est pas bon`)
    .custom((value) =>
      sequelize
        .query('SELECT uuid from entities WHERE uuid = ? LIMIT 1', {
          type: QueryTypes.SELECT,
          model: entity,
          replacements: [value],
        })
        .then((ent) => {
          if (!ent.length > 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(`l'entité n'existe plus`)
          }
        })
    ),
  body('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le nom de l'post`)
    .isIn(paperVariantList)
    .withMessage(
      `le type du papier n'est pas connu dans la liste des possibilités`
    ),
  body('title')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le titre du papier`)
    .isString()
    .withMessage(`format du titre de papier incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le titre du papier doit avoir entre 2 et 100 caractères`),
  body('content')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le contenu`)
    .isString()
    .withMessage(`format de contenu papier incorrect`)
    .isLength({ min: 2, max: 30000 })
    .withMessage(`le contenu doit avoir entre 2 et 30000 caractères`),
  body('classroom')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer pour quelle classe est le papier`)
    .isString()
    .withMessage(`format de contenu papier incorrect`)
    .isLength({ min: 2, max: 30 })
    .withMessage(`le contenu doit avoir entre 2 et 30 caractères`),
  body('isPrivate')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la confidentialité du post`)
    .isBoolean()
    .withMessage(`format de la confidentialité du post incorrect`),
  body('place')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le lieu pour l'évènement`)
    .isString()
    .withMessage(`format du lieu incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le contenu doit avoir entre 2 et 100 caractères`),
  body('date')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la date`)
    .isString()
    .withMessage(`format du lieu incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le contenu doit avoir entre 2 et 100 caractères`),
  body('startdate')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`Veillez indiquer la date de début`)
    .custom((value, { req }) => new Date(value).getTime() > 0)
    .withMessage(`format invalide pour la date de début`),
  body('enddate')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`Veillez indiquer la date de fin`)
    .custom((value, { req }) => new Date(value).getTime() > 0)
    .withMessage(`format invalide pour la date de début`),
  body('files')
    .optional()
    .custom((value, { req }) => {
      if (req.files && req.files.length > 0) {
        return true
      }
      return false
    })
    .withMessage('Veillez telecharger au moins une image ')
    .custom((value, { req }) => {
      let isValid = true

      req.files.forEach((file) => {
        if (!imageMimeTypes.includes(file.mimetype)) {
          isValid = false
        }
      })

      return isValid
    })
    .withMessage('seuls les fichiers de type image sont acceptés'),
  check('greather')
    .custom((value, { req }) => {
      if (req.body.startdate && req.body.enddate)
        return Number(req.body.enddate) > Number(req.body.startdate)
      return true
    })
    .withMessage(`La date de fin doit etre supérieure à la date de début`),

  check('todeletefilesUuids.*')
    // .optional()
    .isUUID()
    .withMessage(`le format des images doit etre en uuid`),
])

module.exports = putPaperValidator
