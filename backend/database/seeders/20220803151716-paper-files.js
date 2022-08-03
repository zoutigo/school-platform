const { v4: uuidv4 } = require('uuid')
const { QueryTypes } = require('@sequelize/core')
const FileP = require('../../models/FileP')
const PaperFiles = require('../../models/PaperFiles')
const PaperP = require('../../models/PaperP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      // paper files

      const oldPaperFiles = await PaperFiles.findAll({
        nest: true,
        raw: true,
      })

      const oldFiles = await FileP.findAll({
        nest: true,
        raw: true,
      })
      const oldPapers = await PaperP.findAll({
        nest: true,
        raw: true,
      })

      const newPapers = await queryInterface.sequelize.query(
        ` SELECT * FROM papers`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const newFiles = await queryInterface.sequelize.query(
        ` SELECT * FROM files`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const withNewPaperIds = oldPaperFiles.map((op) => {
        const oldPaper = oldPapers.find((p) => p.id === op.paperId)

        const newPaper = newPapers.find(
          (n) =>
            JSON.stringify(n.title) === JSON.stringify(oldPaper.title) &&
            JSON.stringify(n.type) === JSON.stringify(oldPaper.type)
        )

        return { ...op, newPaperId: newPaper.id }
      })

      const withNewFileIds = withNewPaperIds.map((pap) => {
        const oldFile = oldFiles.find((f) => f.id === pap.fileId)

        const newFile = newFiles.find(
          (f) =>
            JSON.stringify(f.filename) === JSON.stringify(oldFile.filename) &&
            JSON.stringify(f.filepath) === JSON.stringify(oldFile.filepath)
        )

        return { ...pap, newFileId: newFile.id }
      })

      const paperFiles = withNewFileIds.map(
        ({ newFileId, newPaperId, createdAt, updatedAt }) => ({
          uuid: uuidv4(),
          fileId: newFileId,
          paperId: newPaperId,
          createdAt,
          updatedAt,
        })
      )

      await queryInterface.bulkInsert('paper_files', paperFiles, { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('paper_files', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
