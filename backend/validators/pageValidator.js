/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const Joi = require('joi')
const SanitizeHtml = require('sanitize-html')
const { toArray } = require('../utils/toArray')
Joi.objectId = require('joi-objectid')(Joi)

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

module.exports.pageValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case '_id':
        return Joi.object({
          _id: Joi.objectId(),
        }).validate(data)
      case 'id':
        return Joi.object({
          id: Joi.objectId(),
        }).validate(data)

      case 'title':
        return Joi.object({
          title: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'alias':
        return Joi.object({
          alias: Joi.string().required().min(3).max(30),
        }).validate(data)

      case 'text':
        return Joi.object({
          text: htmlJoi.string().required().htmlStrip().min(3).max(50000),
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
