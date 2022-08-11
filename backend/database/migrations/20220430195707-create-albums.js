const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'albums',
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
          alias: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
            unique: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          descr: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },
          isActive: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          isPrivate: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
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
          deletedAt: {
            type: Sequelize.DATE,
            defaultValue: null,
          },
        },
        { t }
      )
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('albums')
  },
}
