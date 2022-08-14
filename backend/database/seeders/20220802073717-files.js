const { v4: uuidv4 } = require('uuid')
const { QueryTypes } = require('@sequelize/core')

const AlbumP = require('../../models/AlbumP')
const FileP = require('../../models/FileP')
const CardP = require('../../models/CardP')
const CardImages = require('../../models/CardImages')
const PaperFiles = require('../../models/PaperFiles')
const PaperP = require('../../models/PaperP')
const PreinscriptionFiles = require('../../models/PreinscriptionFiles')
const PreinscriptionP = require('../../models/PreinscriptionP')

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
      const oldPapers = await PaperP.findAll({
        nest: true,
        raw: true,
      })
      const oldPreincriptions = await PreinscriptionP.findAll({
        nest: true,
        raw: true,
      })

      const newAlbums = await queryInterface.sequelize.query(
        ` SELECT * FROM albums`,
        {
          type: QueryTypes.SELECT,
        }
      )

      // console.log('new albums', newAlbums)
      const newPapers = await queryInterface.sequelize.query(
        ` SELECT * FROM papers`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const newPreincriptions = await queryInterface.sequelize.query(
        ` SELECT * FROM preinscriptions`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const newCards = await queryInterface.sequelize.query(
        ` SELECT * FROM cards`,
        {
          type: QueryTypes.SELECT,
        }
      )

      // case albums

      const oldAlbums = await AlbumP.findAll({ include: [FileP], nest: true })

      const albumFilesAccu = []

      for (let j = 0; j < oldAlbums.length; j += 1) {
        if (oldAlbums[j].files.length > 0) {
          const { files } = oldAlbums[j]

          for (let i = 0; i < files.length; i += 1) {
            albumFilesAccu.push({
              ...files[i].dataValues,
              alias: oldAlbums[j].alias,
            })
          }
        }
      }

      const albumFiles = albumFilesAccu
        .map((file) => {
          const { id, filetype, alias, ...rest } = file
          const oldAbum = oldAlbums.find(
            (album) =>
              JSON.stringify(album.dataValues.alias) ===
              JSON.stringify(file.alias)
          )

          const newAlbum = newAlbums.find(
            (album) =>
              JSON.stringify(album.slug) ===
              JSON.stringify(oldAbum.dataValues.alias)
          )

          if (!newAlbum) return null
          return {
            ...rest,
            albumId: newAlbum ? newAlbum.id : null,
          }
        })
        .filter((album) => album !== null)

      // case papers
      const oldPaperFiles = await PaperFiles.findAll()

      const newPaperFiles = oldPaperFiles.map(
        ({ paperId: oldPaperId, fileId: oldFileId }) => {
          const oldPaper = oldPapers.find((opaper) => opaper.id === oldPaperId)
          const newPaper = newPapers.find(
            (npaper) => npaper.title === oldPaper.title
          )

          const oldFile = oldFiles.find((ofile) => ofile.id === oldFileId)
          const { id, albumId, ...rest } = oldFile

          return {
            paperId: newPaper.id,
            ...rest,
          }
        }
      )

      // case cards

      const oldCardsFiles = await CardImages.findAll()

      const newCardFiles = oldCardsFiles.map(
        ({ cardId: oldCardId, fileId: oldFileId }) => {
          const oldCard = oldCards.find((ocard) => ocard.id === oldCardId)
          const newCard = newCards.find((ncard) => ncard.slug === oldCard.alias)

          const oldFile = oldFiles.find((ofile) => ofile.id === oldFileId)
          const { id, albumId, ...rest } = oldFile

          return {
            cardId: newCard.id,
            ...rest,
          }
        }
      )

      await queryInterface.bulkInsert('files', albumFiles, { t })
      await queryInterface.bulkInsert('files', newCardFiles, { t })
      await queryInterface.bulkInsert('files', newPaperFiles, { t })

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
