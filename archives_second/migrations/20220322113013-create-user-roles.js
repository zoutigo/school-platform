module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'user_roles',
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
          userId: {
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          roleId: {
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'roles',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('user_roles')
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
}
