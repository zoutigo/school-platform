const { user, entity, role } = require('../../../database/models')

const findUserService = async (uuid) => {
  try {
    const requestedUser = await user.findOne({
      where: { uuid },
      attributes: { exclude: ['id', 'password'] },
      include: [
        {
          model: entity,
          attributes: { exclude: ['id'] },
        },
        { model: role, attributes: { exclude: ['id'] } },
      ],
      paranoid: false,
    })

    return { requestedUser, findUserError: false }
  } catch (error) {
    return { requestedUser: null, findUserError: error }
  }
}

module.exports = findUserService
