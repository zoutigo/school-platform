module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('preinscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      childFirstname: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      childLastname: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING(1500),
      },
      status: {
        type: Sequelize.ENUM('etude', 'encours', 'cloturé'),
        defaultValue: 'etude',
      },
      verdict: {
        type: Sequelize.ENUM('ok', 'nok', 'encours'),
        defaultValue: 'encours',
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
    await queryInterface.dropTable('preinscriptions')
  },
}
