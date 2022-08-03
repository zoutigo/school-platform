const { QueryTypes } = require('@sequelize/core')
const { v4: uuidv4 } = require('uuid')
const AlbumP = require('../../models/AlbumP')
const EntityP = require('../../models/EntityP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const oldAlbums = await AlbumP.findAll()
      const entities = await queryInterface.sequelize.query(
        ` SELECT * FROM entities`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const albums = await Promise.all(
        oldAlbums.map(async (oldAlbum) => {
          const {
            entityId,
            alias,
            name,
            description,
            isActive,
            isPrivate,
            createdAt,
            updatedAt,
          } = oldAlbum

          const oldEntity = await EntityP.findOne({ where: { id: entityId } })

          const newEntity = entities.find((e) => e.alias === oldEntity.alias)

          return {
            uuid: uuidv4(),
            alias,
            name,
            descr: description,
            isActive,
            isPrivate,
            createdAt,
            updatedAt,
            entityId: newEntity.id,
          }
        })
      )

      await queryInterface.bulkInsert('albums', albums, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('albums', null, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
