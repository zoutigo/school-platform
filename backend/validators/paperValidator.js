/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const Joi = require('joi')
const { toArray } = require('../utils/toArray')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.paperValidator = (datas) => {
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
              'info'
            ),
        }).validate(data)

      case 'place':
        return Joi.object({
          place: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'file':
        return Joi.object({
          file: Joi.string().required(),
        }).validate(data)

      case 'title':
        return Joi.object({
          title: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'text':
        return Joi.object({
          text: Joi.string().required().min(3).max(200000),
        }).validate(data)

      case 'entity':
        return Joi.object({
          entity: Joi.objectId(),
        }).validate(data)

      case 'author':
        return Joi.object({
          author: Joi.objectId(),
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
