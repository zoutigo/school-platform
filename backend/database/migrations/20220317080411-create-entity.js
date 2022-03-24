const { pageRawContent } = require('../../constants/pageRawContent')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      alias: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.DataTypes.STRING(10000),
        defaultValue: JSON.stringify(pageRawContent),
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entities')
  },
}
