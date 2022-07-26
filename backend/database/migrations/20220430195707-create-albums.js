module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'albums',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          name: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          alias: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          description: {
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
