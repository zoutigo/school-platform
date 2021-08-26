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

module.exports.paperValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case 'id':
        return Joi.object({
          id: Joi.number(),
        }).validate(data)

      case 'type':
        return Joi.object({
          type: Joi.string()
            .required()
            .valid(
              'article',
              'activite',
              'parent-info',
              'newsletter',
              'menu',
              'breve',
              'info',
              'fourniture'
            ),
        }).validate(data)

      case 'classe_fourniture':
        return Joi.object({
          classe_fourniture: Joi.string()
            .required()
            .valid(
              'ps',
              'ms',
              'gs',
              'cp',
              'ce1',
              'ce2',
              'cm1',
              'cm2',
              'adaptation'
            ),
        }).validate(data)

      case 'place':
        return Joi.object({
          place: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'content':
        return Joi.object({
          content: Joi.any().required(),
        }).validate(data)

      case 'file':
        return Joi.object({
          file: Joi.string().required(),
        }).validate(data)

      case 'title':
        return Joi.object({
          title: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'entityAlias':
        return Joi.object({
          entityAlias: Joi.string().required().min(2).max(50),
        }).validate(data)

      case 'entity':
        return Joi.object({
          entity: Joi.objectId(),
        }).validate(data)

      case 'startdate':
        return Joi.object({
          startdate: Joi.number().integer(),
        }).validate(data)

      case 'enddate':
        return Joi.object({
          enddate: Joi.number().integer(),
        }).validate(data)

      case 'author':
        return Joi.object({
          author: Joi.objectId(),
        }).validate(data)

      case 'isPrivate':
        return Joi.object({
          isPrivate: Joi.bool().required(),
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
