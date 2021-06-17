/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const { toArray } = require('../utils/toArray')

module.exports.roleValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case '_id':
        return Joi.object({
          _id: Joi.objectId(),
        }).validate(data)

      case 'entity':
        return Joi.object({
          entity: Joi.objectId(),
        }).validate(data)

      case 'name':
        return Joi.object({
          name: Joi.string().required().min(3).max(50),
        }).validate(data)

      case 'mission':
        return Joi.object({
          mission: Joi.string().required().min(2).max(100),
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
