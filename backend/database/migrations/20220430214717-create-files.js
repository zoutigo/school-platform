const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'files',
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

          filename: {
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false,
          },
          filepath: {
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false,
          },
          filetype: {
            type: Sequelize.DataTypes.ENUM('image', 'file'),
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
          deletedAt: {
            type: Sequelize.DATE,
            defaultValue: null,
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
    await queryInterface.dropTable('files')
  },
}
