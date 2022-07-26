module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'suggestions',
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
          title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          topic: {
            type: Sequelize.DataTypes.ENUM(
              'bug',
              'idea',
              'improvment',
              'other'
            ),
            allowNull: false,
          },
          message: {
            type: Sequelize.DataTypes.STRING(1000),
            allowNull: false,
          },
          status: {
            type: Sequelize.DataTypes.ENUM('open', 'read', 'answered'),
            defaultValue: 'open',
          },
          userId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            },
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
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suggestions')
  },
}
