const { Op } = require('sequelize')
const { user, entity, role } = require('../../../database/models')

const putUserClassroomService = async (classrooms, uuid) => {
  try {
    const toUpdateUser = await user.findOne({
      where: { uuid },
      include: [role, entity],
    })

    await toUpdateUser.setEntities([])

    const toAddClassrooms = await entity.findAll({
      where: {
        uuid: {
          [Op.or]: classrooms,
        },
      },
    })

    await toUpdateUser.setEntities(toAddClassrooms)

    const putClassroomsUser = await user.findOne({
      where: { uuid },
      attributes: { exclude: ['id', 'password'] },
      include: [
        {
          model: entity,
          attributes: { exclude: ['id'] },
        },
        {
          model: role,
          attributes: { exclude: ['id'] },
        },
      ],
    })

    console.log('classrooms', putClassroomsUser.entities.length)

    return {
      putClassroomsUser,
      putClassroomError: false,
    }
  } catch (error) {
    return {
      putClassroomsUser: null,
      putClassroomError: error,
    }
  }
}

module.exports = putUserClassroomService
