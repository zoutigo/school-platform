/* eslint-disable consistent-return */
const Roles = require('../models/Role')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const { roleValidator } = require('../validators/roleValidator')

module.exports.postRole = async (req, res, next) => {
  const { isAdmin } = req.user
  const { id: roleId, action } = req.query
  const userIsAllowed = isAdmin

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin,teacher,manager and moderator are allowed ')
    )

  const errors = roleValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  const { name, mission, entity } = req.body

  if (action === 'create') {
    // case role creation

    if (!name || !mission || !entity)
      return next(
        new BadRequest(
          'une ou plusieurs données manquante: name,mission,entity'
        )
      )

    const newRole = new Roles(req.body)
    try {
      const savedRole = await newRole.save()
      if (savedRole) {
        return res.status(201).send({ message: 'Role correctement créee' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && roleId) {
    // case update

    const currentRole = await Roles.findOne({ _id: roleId })
    if (!currentRole) return next(new BadRequest("Le role  n'existe pas"))

    try {
      const updatedRole = await Roles.findOneAndUpdate(
        { _id: roleId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedRole) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Role correctement modifié')
        }
        return res.status(200).send({
          message: 'Role correctement modifié',
          data: updatedRole,
        })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && roleId) {
    try {
      const deletedRole = await Roles.findOneAndDelete({ _id: roleId })
      if (deletedRole) {
        return res.status(200).send({ message: 'role deleted successfully' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('params missing'))
  }
}

module.exports.getRoles = async (req, res, next) => {
  const errors = roleValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  try {
    if (req.query.id) {
      req.query._id = req.query.id
      delete req.query.id
    }
    const roles = await Roles.find(req.query).populate('entity')

    if (roles.length < 1) return next(new NotFound('role not found'))
    return res.status(200).send(roles)
  } catch (err) {
    return next(err)
  }
}
