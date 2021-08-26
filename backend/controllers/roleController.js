/* eslint-disable consistent-return */
const EntityP = require('../models/EntityP')
const Roles = require('../models/Role')
const RoleP = require('../models/RoleP')
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
    return next(new BadRequest(errors.join()))
  }

  const { name, mission, entityId } = req.body

  if (action === 'create') {
    // case role creation

    if (!name || !mission || !entityId)
      return next(
        new BadRequest(
          'une ou plusieurs données manquante: name,mission,entity'
        )
      )

    try {
      const nextrole = await RoleP.create({ name, mission, entityId })
      if (nextrole) {
        return res.status(201).send({ message: 'Role correctement créee' })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && roleId) {
    // case update

    const currentrole = await RoleP.findOne({
      where: { id: roleId },
    })

    if (!currentrole) return next(new BadRequest("Le role  n'existe pas"))

    try {
      const updatedRole = await RoleP.update(req.body, {
        where: { id: roleId },
        returning: true,
      })

      if (updatedRole[1]) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Role correctement modifié')
        }
        return res.status(200).send({
          message: 'Role correctement modifié',
          data: updatedRole[1],
        })
      }
      return next('something went wrong with server')
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && roleId) {
    try {
      const deletedrole = await RoleP.destroy({
        where: {
          id: roleId,
        },
      })
      if (deletedrole) {
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
    return next(new BadRequest(errors.join()))
  }

  try {
    // const roles = await Roles.find(req.query).populate('entity')
    const roles = await RoleP.findAll({
      where: req.query,
      include: EntityP,
    })

    if (roles.length < 1) return next(new NotFound('role not found'))
    return res.status(200).send(roles)
  } catch (err) {
    return next(err)
  }
}
