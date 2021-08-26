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

module.exports.entityValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case '_id':
        return Joi.object({
          _id: Joi.objectId(),
        }).validate(data)

      case 'name':
        return Joi.object({
          name: Joi.string().required().min(3).max(50),
        }).validate(data)

      case 'alias':
        return Joi.object({
          alias: Joi.string().required().min(2).max(50),
        }).validate(data)
      case 'content':
        return Joi.object({
          content: Joi.string().required(),
        }).validate(data)

      case 'email':
        return Joi.object({
          email: Joi.string().required().email(),
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
