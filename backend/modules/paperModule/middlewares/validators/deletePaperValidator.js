const { QueryTypes } = require('sequelize')
const { param, body } = require('express-validator')
const validate = require('../../../../middlewares/validate')
const { entity, paper, sequelize } = require('../../../../database/models')

const deletePaperValidator = validate([
  param('uuid')
    .not()
    .isEmpty()
    .withMessage(`veillez indiquer le post à supprimer`)
    .isUUID()
    .withMessage(`le format de du post n'est pas bon`)
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
    .withMessage(`le format de l'entité du post n'est pas bon`)
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
])

module.exports = deletePaperValidator
