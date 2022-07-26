const EntityP = require('../../backend/models/EntityP')
const FileP = require('../../backend/models/FileP')
const PaperP = require('../../backend/models/PaperP')
const { Entity } = require('../../backend/database/models')

module.exports = {
  async up(queryInterface, Sequelize) {
    const newEntities = await Entity.findAll()
    const oldEntities = await EntityP.findAll()

    const getNewEntityId = (oldEntityId) => {
      const oldEntity = oldEntities.find((entity) => oldEntityId === entity.id)
      const newEntity = newEntities.find(
        (entity) => entity.alias === oldEntity.alias
      )
      return newEntity.id
    }

    const oldPapers = await PaperP.findAll({
      include: [{ model: FileP }],
    })

    const papers = oldPapers.map((paper) => {
      const files = paper.files.length
        ? paper.files.map(({ filename, filepath, filetype }) => ({
            filename,
            filepath,
            filetype,
          }))
        : null

      return {
        title: paper.title,
        type: String(paper.type),
        content: paper.content,
        classe_fourniture: paper.classe_fourniture,
        isPrivate: paper.isPrivate,
        date: paper.date,
        startdate: paper.startdate,
        enddate: paper.enddate,
        files: files,
        entityId: getNewEntityId(paper.entityId),
        createdAt: paper.createdAt,
        updatedAt: paper.updatedAt,
      }
    })

    await queryInterface.bulkInsert('papers', papers, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('papers', null, {})
  },
}
