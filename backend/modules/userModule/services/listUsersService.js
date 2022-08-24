const { user, entity, role } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listUsersService = async (datas) => {
  const options = {
    attributes: { exclude: ['id', 'password'] },
    include: [
      {
        model: entity,
        attributes: { exclude: ['id'] },
      },
      { model: role, attributes: { exclude: ['id'] } },
    ],
    paranoid: false,
  }
  try {
    const listUsers =
      Object.entries(datas).length > 0
        ? await user.findAll({
            where: datas,
            ...options,
          })
        : await user.findAll({
            ...options,
          })

    return { listUsers, listUsersError: false }
  } catch (error) {
    errorLogger('listUsersService', error)
    return { listUsers: null, listUsersError: error.message }
  }
}

module.exports = listUsersService
