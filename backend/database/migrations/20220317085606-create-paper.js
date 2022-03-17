module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('papers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM(
          'article',
          'activite',
          'parent-info',
          'newsletter',
          'menu',
          'breve',
          'info',
          'fourniture'
        ),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(10000),
      },
      classe_fourniture: {
        type: Sequelize.STRING(30),
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      date: {
        type: Sequelize.STRING(14),
        defaultValue: new Date().getTime(),
      },
      startdate: {
        type: Sequelize.STRING(14),
      },
      enddate: {
        type: Sequelize.STRING(14),
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
    await queryInterface.dropTable('papers')
  },
}
