const { user, entity, role } = require('../../../database/models')

const putUserService = async (datas, uuid, requester) => {
  try {
    await user.update({ ...datas }, { where: { uuid }, returning: true })

    const updatedUser = await user.findOne({
      where: { uuid },
      attributes: { exclude: ['password', 'id'] },
      include: [
        {
          model: role,
          attributes: ['name', 'uuid', 'slug'],
        },
        {
          model: entity,
          attributes: { exclude: ['id'] },
        },
      ],
    })

    return { updatedUser, updateUserError: false }
  } catch (error) {
    console.log(error)
    return { updatedUser: null, updateUserError: error }
  }
}

module.exports = putUserService
