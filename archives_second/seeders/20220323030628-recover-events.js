const EntityP = require('../../models/EntityP')
const EventP = require('../../models/EventP')
const { Entity } = require('../models')

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

    const oldEvents = await EventP.findAll()

    const events = oldEvents.map((event) => ({
      title: event.title,
      content: event.content,
      place: event.place,
      date: event.date,
      isPrivate: event.isPrivate,
      entityId: getNewEntityId(event.entityId),
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }))

    await queryInterface.bulkInsert('events', events, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {})
  },
}
