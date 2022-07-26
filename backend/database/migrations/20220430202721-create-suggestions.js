const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'suggestions',
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
          topic: {
            type: Sequelize.DataTypes.ENUM,
            values: ['bug', 'idea', 'improve'],
            defaultValue: 'idea',
            allowNull: false,
          },
          status: {
            type: Sequelize.DataTypes.ENUM,
            values: ['open', 'read', 'answered'],
            defaultValue: 'open',
            allowNull: false,
          },
          title: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          content: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
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
    await queryInterface.dropTable('suggestions')
  },
}
