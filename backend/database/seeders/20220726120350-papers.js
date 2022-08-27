const { QueryTypes } = require('@sequelize/core')
const { v4: uuidv4 } = require('uuid')
const PaperP = require('../../models/PaperP')
const EntityP = require('../../models/EntityP')
const EventP = require('../../models/EventP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const oldEvents = await EventP.findAll()
      const oldPapers = await PaperP.findAll()
      const entities = await queryInterface.sequelize.query(
        ` SELECT * FROM entities`,
        {
          type: QueryTypes.SELECT,
        }
      )

      // native papers
      const papers = await Promise.all(
        oldPapers.map(async (oldPaper) => {
          const {
            entityId,
            type,
            title,
            content,
            classe_fourniture: classroom,
            isPrivate,
            date,
            startdate,
            enddate,
            createdAt,
            updatedAt,
          } = oldPaper

          const oldEntity = await EntityP.findOne({ where: { id: entityId } })

          const newEntity = entities.find((e) => e.alias === oldEntity.alias)

          return {
            uuid: uuidv4(),
            type,
            title,
            content,
            classroom,
            isPrivate,
            date: new Date(Number(date)),
            startdate: startdate ? new Date(Number(startdate)) : null,
            enddate: enddate ? new Date(Number(enddate)) : null,
            createdAt,
            updatedAt,
            entityId: newEntity.id,
          }
        })
      )

      // event papers

      const events = await Promise.all(
        oldEvents.map(async (oldEvent) => {
          const {
            entityId,
            title,
            content,
            place,
            date,
            createdAt,
            updatedAt,
          } = oldEvent

          const oldEventEntity = await EntityP.findOne({
            where: { id: entityId },
          })
          const newEntity = entities.find(
            (e) => e.alias === oldEventEntity.alias
          )

          return {
            uuid: uuidv4(),
            title,
            type: 'event',
            content,
            classroom: null,
            isPrivate: false,
            startdate: null,
            enddate: null,
            place,
            date: date ? new Date(Number(date)) : new Date(),
            createdAt,
            updatedAt,
            entityId: newEntity.id,
          }
        })
      )

      await queryInterface.bulkInsert('papers', papers, { transaction })
      await queryInterface.bulkInsert('papers', events, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('papers', null, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
