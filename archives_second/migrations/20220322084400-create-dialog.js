module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'dialogs',
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
          text: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          startdate: {
            type: Sequelize.DataTypes.STRING(13),
            allowNull: false,
          },
          enddate: {
            type: Sequelize.DataTypes.STRING(13),
            allowNull: false,
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
    await queryInterface.dropTable('dialogs')
  },
}
