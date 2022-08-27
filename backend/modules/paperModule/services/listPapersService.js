/* eslint-disable no-param-reassign */
const { paper, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listPapersService = async (params) => {
  const { entityAlias, type, ...rest } = params
  const options = {
    attributes: { exclude: ['id'] },
    paranoid: true,
    include: [
      {
        model: file,
        attributes: {
          exclude: ['id', 'albumId', 'paperId', 'cardId', 'preinscriptionId'],
        },
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
    order: [['createdAt', 'DESC']],
    limit: 10,
  }
  try {
    const requestedEntity =
      entityAlias && entityAlias !== 'null'
        ? await entity.findOne({
            where: { alias: entityAlias },
          })
        : null

    if (requestedEntity) {
      params.entityId = requestedEntity.id
    }
    delete params.entityAlias

    const paperList =
      Object.entries(params).length > 0
        ? await paper.findAll({
            where: params,
            ...options,
          })
        : await paper.findAll({ ...options })

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
