const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'users',
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
          lastname: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false,
          },
          firstname: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false,
          },
          gender: {
            type: Sequelize.DataTypes.ENUM('monsieur', 'madame'),
            defaultValue: 'monsieur',
            allowNull: false,
          },
          email: {
            type: Sequelize.DataTypes.STRING(50),
            unique: true,
            allowNull: false,
          },
          phone: {
            type: Sequelize.DataTypes.INTEGER,
          },
          isVerified: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          password: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
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
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  },
}
