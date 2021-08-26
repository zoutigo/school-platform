/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const Joi = require('joi')
const { toArray } = require('../utils/toArray')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.suggestionValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case 'id':
        return Joi.object({
          id: Joi.number(),
        }).validate(data)

      case 'title':
        return Joi.object({
          title: Joi.string().required().min(3).max(100),
        }).validate(data)

      case 'topic':
        return Joi.object({
          topic: Joi.string()
            .required()
            .valid('bug', 'idea', 'improvment', 'other'),
        }).validate(data)

      case 'message':
        return Joi.object({
          message: Joi.string().required().min(3).max(1000),
        }).validate(data)

      case 'userId':
        return Joi.object({
          userId: Joi.number(),
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
