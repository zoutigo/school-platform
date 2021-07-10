/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const Joi = require('joi')
const SanitizeHtml = require('sanitize-html')
Joi.objectId = require('joi-objectid')(Joi)
const { toArray } = require('../utils/toArray')

const htmlJoi = Joi.extend((joi) => {
  const result = {
    type: 'string',
    base: joi.string(),
    rules: {
      htmlStrip: {
        validate(value) {
          return SanitizeHtml(value)
        },
      },
    },
  }
  return result
})

module.exports.preinscriptionValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case '_id':
        return Joi.object({
          _id: Joi.objectId(),
        }).validate(data)

      case 'childFirstname':
        return Joi.object({
          childFirstname: Joi.string().required().min(2).max(30),
        }).validate(data)

      case 'status':
        return Joi.object({
          status: Joi.string().required().enum('étude', 'traitée', 'cloturé'),
        }).validate(data)

      case 'verdict':
        return Joi.object({
          verdict: Joi.string().required().enum('ok', 'nok', 'encours'),
        }).validate(data)

      case 'message':
        return Joi.object({
          message: htmlJoi.string().required().htmlStrip().max(500),
        }).validate(data)

      default:
        return null
    }
  }
  const errorsList = toArray(datas).map((data) => {
    if (data) {
      if (validator(data)) {
        const { error } = validator(data)
        if (error) return error.details[0].message
      } else return `'${Object.keys(data)}' n'est pas un champ attendu`
    }
  })
  const errors = errorsList.filter((error) => error !== undefined)
  return errors
}
