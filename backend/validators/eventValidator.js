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

      case 'text':
        return Joi.object({
          text: Joi.string().required().min(3).max(500),
        }).validate(data)

      case 'date':
        return Joi.object({
          date: Joi.number().integer(),
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
      const { error } = validator(data)
      if (error) return error.details[0].message
    }
  })
  const errors = errorsList.filter((error) => error !== undefined)
  return errors
}
