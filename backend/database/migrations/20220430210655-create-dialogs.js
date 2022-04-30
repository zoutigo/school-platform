module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'dialogs',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },

          title: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          text: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },

          startdate: {
            type: Sequelize.DataTypes.DATE,
          },
          enddate: {
            type: Sequelize.DataTypes.DATE,
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
    await queryInterface.dropTable('dialogs')
  },
}
