const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'papers',
        'entityId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'entities',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'albums',
        'entityId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'entities',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'events',
        'entityId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'entities',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'suggestions',
        'userId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'mails',
        'userId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'preinscriptions',
        'userId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('papers', 'entityId', { t })
      await queryInterface.removeColumn('albums', 'entityId', { t })
      await queryInterface.removeColumn('events', 'entityId', { t })
      await queryInterface.removeColumn('suggestions', 'userId', { t })
      await queryInterface.removeColumn('mails', 'userId', { t })
      await queryInterface.removeColumn('preinscriptions', 'userId', { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
