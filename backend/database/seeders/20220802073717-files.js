const { v4: uuidv4 } = require('uuid')
const { QueryTypes } = require('@sequelize/core')

const AlbumP = require('../../models/AlbumP')
const FileP = require('../../models/FileP')
const CardP = require('../../models/CardP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const oldFiles = await FileP.findAll({
        nest: true,
        raw: true,
      })
      const oldCards = await CardP.findAll({
        nest: true,
        raw: true,
      })

      const newAlbums = await queryInterface.sequelize.query(
        ` SELECT * FROM albums`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const newPapers = await queryInterface.sequelize.query(
        ` SELECT * FROM papers`,
        {
          type: QueryTypes.SELECT,
        }
      )

      // all files

      const newFiles = oldFiles.map(
        ({ filename, filepath, createdAt, updatedAt }) => ({
          uuid: uuidv4(),
          filename: filename || 'no filename',
          filepath: filepath || 'nofilepath',
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
        })
      )

      const newCardFiles = oldCards.map(({ alias, path }) => ({
        uuid: uuidv4(),
        filename: alias,
        filepath: path,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))

      await queryInterface.bulkInsert('files', newFiles, { t })
      await queryInterface.bulkInsert('files', newCardFiles, { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('files', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
