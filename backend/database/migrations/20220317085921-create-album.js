module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('albums', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alias: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        defaulValue: 'Il faut une description',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaulValue: true,
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
        defaulValue: true,
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
    await queryInterface.dropTable('albums')
  },
}
