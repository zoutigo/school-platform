/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const Joi = require('joi')
const { toArray } = require('../utils/toArray')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.eventValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case '_id':
        return Joi.object({
          _id: Joi.objectId(),
        }).validate(data)

      case 'title':
        return Joi.object({
          title: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'place':
        return Joi.object({
          place: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'content':
        return Joi.object({
          content: Joi.any().required(),
        }).validate(data)

      case 'date':
        return Joi.object({
          date: Joi.number().integer(),
        }).validate(data)

      case 'author':
        return Joi.object({
          author: Joi.objectId(),
        }).validate(data)

      case 'entityAlias':
        return Joi.object({
          entityAlias: Joi.string().required().min(2).max(50),
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
