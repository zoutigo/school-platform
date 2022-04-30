module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'users',
        {
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
          lastname: {
            type: Sequelize.DataTypes.STRING(30),
          },
          firstname: {
            type: Sequelize.DataTypes.STRING(30),
          },
          gender: {
            type: Sequelize.DataTypes.ENUM('monsieur', 'madame', 'choisir'),
            defaultValue: 'choisir',
          },
          email: {
            type: Sequelize.DataTypes.STRING(50),
            unique: true,
          },
          phone: {
            type: Sequelize.DataTypes.STRING(14),
          },
          isAdmin: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          isManager: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          isModerator: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          isTeacher: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          isVerified: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          password: {
            type: Sequelize.DataTypes.STRING(64),
          },
          emailToken: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: null,
          },
          losspassToken: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: null,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          },
        },
        { transaction }
      )
    } catch (err) {
      await transaction.rollback()
      throw err
    }
    await transaction.commit()
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
}
