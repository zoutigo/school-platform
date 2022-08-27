/* eslint-disable no-param-reassign */
const { album, file, entity } = require('../../../database/models')

const listAlbumsService = async (params) => {
  const { entityAlias, ...rest } = params
  const options = {
    attributes: { exclude: ['id', 'entityId'] },
    paranoid: true,
    include: [
      {
        model: file,
        exclude: ['id', 'albumId', 'paperId', 'cardId', 'preinscriptionId'],
        paranoid: true,
      },
      {
        model: entity,
        attributes: { exclude: ['id', 'papers', 'paperid'] },
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

    const albumList =
      Object.entries.length > 0
        ? await album.findAll({
            where: params,
            ...options,
          })
        : await album.findAll(options)

    return { albumList, albumListError: false }
  } catch (error) {
    return {
      albumList: false,
      albumListError: error,
    }
  }
}

module.exports = listAlbumsService
