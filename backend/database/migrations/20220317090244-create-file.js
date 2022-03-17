module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      filename: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      filepath: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      filetype: {
        type: Sequelize.ENUM('image', 'file'),
        defaultValue: 'image',
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
    await queryInterface.dropTable('files')
  },
}
