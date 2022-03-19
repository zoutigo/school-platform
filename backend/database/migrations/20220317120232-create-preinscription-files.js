module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'preinscription_files',
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
          preinscriptionId: {
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'preinscriptions',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          fileId: {
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'files',
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
      await queryInterface.dropTable('preinscription_files')
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
}
