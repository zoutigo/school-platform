const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'entities',
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

          name: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          alias: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
            unique: true,
          },
          email: {
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
    await queryInterface.dropTable('entities')
  },
}
