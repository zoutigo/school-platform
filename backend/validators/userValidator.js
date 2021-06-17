/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const Joi = require('joi')
const { toArray } = require('../utils/toArray')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.userValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case '_id':
        return Joi.object({
          _id: Joi.objectId(),
        }).validate(data)

      case 'role':
        return Joi.object({
          role: Joi.objectId(),
        }).validate(data)

      case 'email':
        return Joi.object({
          email: Joi.string().required().email(),
        }).validate(data)

      case 'password':
        return Joi.object({
          password: Joi.string()
            .required()
            .pattern(
              new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
              'pass'
            ), // 1 majuscule, 1 minuscule, 1 chiffre, 8 caracteres minimum
        }).validate(data)

      case 'passwordConfirm':
        return Joi.object({
          passwordConfirm: Joi.string()
            .required()
            .pattern(
              new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
              'pass'
            ), // 1 majuscule, 1 minuscule, 1 chiffre, 8 caracteres minimum
        }).validate(data)

      case 'gender':
        return Joi.object({
          gender: Joi.string().required().valid('monsieur', 'madame'),
        }).validate(data)

      case 'firstname':
        return Joi.object({
          firstname: Joi.string().required().min(3).max(30),
        }).validate(data)

      case 'lastname':
        return Joi.object({
          lastname: Joi.string().required().min(3).max(30),
        }).validate(data)

      case 'childrenClasses':
        return Joi.object({
          childrenClasses: Joi.array().items(Joi.objectId()),
        }).validate(data)

      case 'roles':
        return Joi.object({
          roles: Joi.array().items(Joi.objectId()),
        }).validate(data)

      case 'isAdmin':
        return Joi.object({
          isAdmin: Joi.boolean().required(),
        }).validate(data)

      case 'isManager':
        return Joi.object({
          isManager: Joi.boolean().required(),
        }).validate(data)

      case 'isTeacher':
        return Joi.object({
          isTeacher: Joi.boolean().required(),
        }).validate(data)

      case 'isModerator':
        return Joi.object({
          isModerator: Joi.boolean().required(),
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
