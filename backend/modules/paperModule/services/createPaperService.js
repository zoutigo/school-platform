const dotenv = require('dotenv')

const { paper, entity, file } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

dotenv.config()

const createPaperService = async (datas) => {
  const { entityUuid, ...rest } = datas

  try {
    const newPaper = await paper.create(rest)
    const {
      dataValues: { uuid, ...sold },
    } = newPaper
    const paperEntity = await entity.findOne({
      where: { uuid: entityUuid },
      paranoid: true,
    })

    await newPaper.setEntity(paperEntity)

    const createdPaper = await paper.findOne({
      where: { uuid },
      paranoid: true,
      // attributes: { exclude: ['id'] },
      include: [
        {
          model: entity,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
        {
          model: file,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
      ],
    })

    return {
      createdPaper,
      createdPaperError: false,
    }
  } catch (error) {
    errorLogger('createPaperService', error)

    return {
      createdPaper: false,
      createdPaperError: error,
    }
  }
}

module.exports = createPaperService
