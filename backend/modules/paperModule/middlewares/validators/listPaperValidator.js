const { QueryTypes } = require('sequelize')
const { body, check, query } = require('express-validator')
const imageMimeTypes = require('../../../../constants/imageMimeTypes')
const paperVariantList = require('../../../../constants/paperVariantList')
const validate = require('../../../../middlewares/validate')

const { entity, sequelize } = require('../../../../database/models')

const listPaperValidator = validate([
  query('entityUuid')
    .not()
    .optional()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité du papier`)
    .isUUID()
    .withMessage(`le format de l'entité du papier n'est pas bon`)
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
  query('entityAlias')
    .not()
    .optional()
    .isEmpty()
    .withMessage(`veillez indiquer l'entité du papier`)
    .isUUID()
    .withMessage(`le format de l'entité du papier n'est pas bon`)
    .custom((value) =>
      sequelize
        .query('SELECT uuid from entities WHERE alias = ? LIMIT 1', {
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
  query('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le type du post`)
    .isIn(paperVariantList)
    .withMessage(
      `le type du papier n'est pas connu dans la liste des possibilités`
    ),
  query('title')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le titre du papier`)
    .isString()
    .withMessage(`format du titre de papier incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le titre du papier doit avoir entre 2 et 100 caractères`),
  query('slug')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le slug du papier`)
    .isString()
    .withMessage(`format du slug de papier incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le slug du papier doit avoir entre 2 et 100 caractères`),
  query('classroom')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer pour quelle classe est le papier`)
    .isString()
    .withMessage(`format de contenu papier incorrect`)
    .isLength({ min: 2, max: 30 })
    .withMessage(`le contenu doit avoir entre 2 et 30 caractères`),
  query('isPrivate')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la confidentialité du post`)
    .isBoolean()
    .withMessage(`format de la confidentialité du post incorrect`),
  query('place')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le lieu pour l'évènement`)
    .isString()
    .withMessage(`format du lieu incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le contenu doit avoir entre 2 et 100 caractères`),
  query('date')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer la date`)
    .isString()
    .withMessage(`format du lieu incorrect`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`le contenu doit avoir entre 2 et 100 caractères`),
  query('startdate')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`Veillez indiquer la date de début`)
    .custom((value, { req }) => new Date(value).getTime() > 0)
    .withMessage(`format invalide pour la date de début`),
  query('enddate')
    .optional()
    .not()
    .isEmpty()
    .withMessage(`Veillez indiquer la date de fin`)
    .custom((value, { req }) => new Date(value).getTime() > 0)
    .withMessage(`format invalide pour la date de début`),
])

module.exports = listPaperValidator
