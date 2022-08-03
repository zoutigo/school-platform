const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'papers',
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
              'event',
            ],
            allowNull: false,
          },
          title: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          content: {
            type: Sequelize.DataTypes.TEXT,
          },
          classroom: {
            type: Sequelize.DataTypes.STRING(30),
          },
          isPrivate: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
          },
          place: {
            type: Sequelize.DataTypes.STRING(100),
          },
          date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
          },
          startdate: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: null,
          },
          enddate: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: null,
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
