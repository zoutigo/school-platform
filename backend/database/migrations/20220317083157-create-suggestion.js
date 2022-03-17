module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suggestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topic: {
        type: Sequelize.ENUM('bug', 'idea', 'improvment', 'other'),
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('open', 'read', 'answered'),
        defaultValue: 'open',
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
    await queryInterface.dropTable('suggestions')
  },
}
