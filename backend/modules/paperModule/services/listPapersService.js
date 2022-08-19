const { paper, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listPapersService = async () => {
  try {
    const paperList = await paper.findAll({
      attributes: { exclude: ['id'] },
      paranoid: true,
      include: [
        {
          model: file,
          attributes: { exclude: ['id'] },
          paranoid: true,
        },
        {
          model: entity,
          attributes: {
            exclude: ['id', 'papers', 'paperid', 'albums', 'albumId'],
          },
          paranoid: true,
        },
      ],
    })

    return { paperList, paperListError: false }
  } catch (error) {
    errorLogger('listPapersservice', error)
    return {
      paperList: false,
      paperListError: error,
    }
  }
}

module.exports = listPapersService
