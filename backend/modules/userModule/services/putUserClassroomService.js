const { user, entity, role } = require('../../../database/models')

const putUserClassroomService = async (classrooms, uuid) => {
  try {
    const toUpdateUser = await user.findOne({
      where: { uuid },
      include: [role, entity],
      nest: true,
      raw: true,
    })

    const previousClasrooms = toUpdateUser.entities

    // destroy previous associations
    if (previousClasrooms && previousClasrooms.length > 0) {
      previousClasrooms.forEach(async (prevClassroom) => {
        const oldClassroom = await entity.findOne({
          where: { uuid: prevClassroom.uuid },
        })
        await toUpdateUser.removeEntity(oldClassroom)
      })
    }

    // create new associations
    classrooms.forEach(async (newRoleUuid) => {
      const newRole = await role.findOne({
        where: { uuid: newRoleUuid },
      })
      await toUpdateUser.addEntity(newRole)
    })

    const putClassroomsUser = await toUpdateUser.save()

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
