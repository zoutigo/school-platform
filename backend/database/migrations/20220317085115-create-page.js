const { pageRawContent } = require('../../constants/pageRawContent')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      alias: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.STRING(10000),
        defaultValue: JSON.stringify(pageRawContent),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pages')
  },
}
