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

module.exports.cheminValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case '_id':
        return Joi.object({
          _id: Joi.objectId(),
        }).validate(data)

      case 'alias':
        return Joi.object({
          alias: Joi.string().required().min(2).max(100),
        }).validate(data)

      case 'path':
        return Joi.object({
          path: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'description':
        return Joi.object({
          description: htmlJoi.string().required().htmlStrip().min(3).max(200),
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
