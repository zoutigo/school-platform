module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lastname: {
        type: Sequelize.STRING(30),
      },
      firstname: {
        type: Sequelize.STRING(30),
      },
      gender: {
        type: Sequelize.ENUM('monsieur', 'madame', 'choisir'),
        defaultValue: 'choisir',
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(14),
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isManager: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isModerator: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isTeacher: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING(64),
      },
      emailToken: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      losspassToken: {
        type: Sequelize.STRING,
        defaultValue: null,
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
    await queryInterface.dropTable('users')
  },
}
