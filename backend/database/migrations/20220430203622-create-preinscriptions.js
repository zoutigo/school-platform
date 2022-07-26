const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'preinscriptions',
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
          childFirstname: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          childLastname: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          message: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },

          status: {
            type: Sequelize.DataTypes.ENUM,
            values: ['etude', 'encours', 'cloture'],
            defaultValue: 'etude',
            allowNull: false,
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
        },
        { t }
      )
      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('preinscriptions')
  },
}
