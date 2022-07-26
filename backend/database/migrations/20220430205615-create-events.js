const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'events',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          uuid: {
            type: Sequelize.UUID,
            defaultValue: uuidv4(),
          },

          title: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },

          content: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },
          place: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },

          date: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
          },
        },
        { t }
      )
      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events')
  },
}
