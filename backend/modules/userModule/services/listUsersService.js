const { user, entity, role } = require('../../../database/models')

const listUsersService = async () => {
  try {
    const listUsers = await user.findAll({
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

    return { listUsers, listUsersError: false }
  } catch (error) {
    return { listUsers: null, listUsersError: error }
  }
}

module.exports = listUsersService
