const { user, entity, role } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

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
    errorLogger('findUserService', error.message)
    return { requestedUser: null, findUserError: error.message }
  }
}

module.exports = findUserService
