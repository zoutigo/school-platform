module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'papers',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          type: {
            type: Sequelize.DataTypes.ENUM,
            values: [
              'article',
              'activite',
              'parent-info',
              'newsletter',
              'menu',
              'breve',
              'info',
              'fourniture',
            ],
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
          classroom: {
            type: Sequelize.DataTypes.STRING(30),
          },
          isPrivate: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
          },
          date: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: new Date(),
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
    await queryInterface.dropTable('papers')
  },
}
