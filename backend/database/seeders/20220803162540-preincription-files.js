const { v4: uuidv4 } = require('uuid')
const { QueryTypes } = require('@sequelize/core')
const FileP = require('../../models/FileP')
const PreinscriptionFiles = require('../../models/PreinscriptionFiles')
const PreinscriptionP = require('../../models/PreinscriptionP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const oldPreinscriptionFiles = await PreinscriptionFiles.findAll({
        nest: true,
        raw: true,
      })

      const oldFiles = await FileP.findAll({
        nest: true,
        raw: true,
      })
      const oldPreinscriptions = await PreinscriptionP.findAll({
        nest: true,
        raw: true,
      })

      const newPreinscriptions = await queryInterface.sequelize.query(
        ` SELECT * FROM preinscriptions`,
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

      console.log('oldPreinscriptionFiles', oldPreinscriptionFiles)

      const withNewPreinsIds = oldPreinscriptionFiles.map((op) => {
        const oldPreins = oldPreinscriptions.find(
          (p) => p.id === op.preinscriptionId
        )

        console.log('oldpreins', oldPreins)

        const newPreins = newPreinscriptions.find(
          (n) =>
            JSON.stringify(n.title) === JSON.stringify(oldPreins.title) &&
            JSON.stringify(n.type) === JSON.stringify(oldPreins.type)
        )

        return { ...op, newPreinsId: newPreins.id }
      })

      console.log('withNewPreinsIds', withNewPreinsIds)

      // await queryInterface.bulkInsert('preinscription_files', paperFiles, { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('preinscription_files', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
