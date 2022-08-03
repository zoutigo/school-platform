const { v4: uuidv4 } = require('uuid')
const { QueryTypes } = require('@sequelize/core')
const FileP = require('../../models/FileP')
const AlbumP = require('../../models/AlbumP')
const PaperFiles = require('../../models/PaperFiles')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const newFiles = await queryInterface.sequelize.query(
        ` SELECT * FROM files`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const newAlbums = await queryInterface.sequelize.query(
        ` SELECT * FROM albums`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const oldFiles = await FileP.findAll({
        nest: true,
        raw: true,
      })

      // console.log('oldFiles', oldFiles)
      const oldAlbums = await AlbumP.findAll({
        nest: true,
        raw: true,
      })

      const withNewFileId = oldFiles.map((file) => {
        const zefile = newFiles.find((f) => f.filename === file.filename)
        return { ...file, newfileId: zefile.id }
      })

      const withNewAlbumId = withNewFileId.map((file) => {
        const oldAlbum = oldAlbums.find((a) => {
          return JSON.stringify(a.id) === JSON.stringify(file.albumId)
        })

        if (!oldAlbum) return { ...file, newAlbumId: 'undefined' }
        const newAlbum = newAlbums.find(
          (b) => JSON.stringify(b.alias) === JSON.stringify(oldAlbum.alias)
        )

        return { ...file, newAlbumId: newAlbum?.id }
      })

      const album_files = withNewAlbumId
        .filter((a) => a.newAlbumId !== 'undefined')
        .map(({ newfileId, newAlbumId, createdAt, updatedAt }) => ({
          albumId: newAlbumId,
          fileId: newfileId,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
          uuid: uuidv4(),
        }))

      await queryInterface.bulkInsert('album_files', album_files, { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('album_files', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
